<template>
	<div class="page-top">
		<BasePageTop
			:data="pageTopData"
			:modifier-classes="['fs-small']"
		/>
	</div>

	<!-- Не врапить элемент доп элементом(сломается position: sticky) -->
	<BaseFilterWithSearch
		ref="filterWithSearchEl"
		:filter="filterParams"
		:selected-values="selectedValues"
		@change="onChange"
	/>

	<div
		ref="clientsEl"
		class="clients"
	>
		<BaseClients :data="clients" />
	</div>
</template>

<script setup lang="ts">
	import type { UnwrapNestedRefs } from 'vue';
	import { ref, shallowRef, computed, onMounted, nextTick } from 'vue';
	import type {
		ClientPageType,
		ClientPageNavType,
		ClientPageCountType,
		ClientPageClientsType,
	} from '@/types/pages/client-page';
	import { scrollTo } from '@/utils/ui';
	import { useMetaStore } from '@/stores/meta';
	import { handleError } from '@/helpers/handle-error';
	import { useApiFetch } from '@/composables/use-api-fetch';
	import { useFilter } from '@/composables/use-filter';
	import { useInfinityScroll } from '@/composables/use-infinity-scroll';
	import { useApiOnInteraction } from '@/composables/use-api-on-interaction';
	import BasePageTop from '@/components/base-page-top';
	import type { BaseElementType as BaseFilterWithSearchElementType } from '@/components/base-filter-with-search/type';
	import BaseFilterWithSearch from '@/components/base-filter-with-search';
	import BaseClients from '@/components/base-clients';

	const { data, error } = await useApiFetch<ClientPageType>('page/clients/');

	if (!data.value) {
		throw handleError({
			statusCode: error.value?.statusCode || 500,
			fatal: true,
			error: error.value,
		});
	}

	const { setMeta } = useMetaStore();

	const meta = data.value.page.meta;

	setMeta(meta);

	const content = data.value.page.content[0];
	const count = ref(content.count);

	const pageTopData = computed(() => {
		return {
			title: meta.h1,
			breadcrumbs: content.breadcrumbs,
			count: count.value,
			new_count: content.last_month_count,
		};
	});

	const filterParams = computed(() => {
		const filterContent = content.filter;

		// fix me api
		// По хорошему надо вынести в апи названия полей и тип поля.
		// Но пока апи сделали так поэтому пишем свои костыли
		// Если меняеш name фильтра поправь также код(В конце) в сортировке
		const filterTypes = {
			activity: {
				name: 'Рубрика',
				multiple: false,
				type: 'radio',
			},
			type: {
				name: 'Тип',
				multiple: false,
				type: 'radio',
			},
			date: {
				name: 'Период',
				multiple: false,
				type: 'radio',
			},
		};

		const items: {
			name: string;
			multiple: boolean;
			field_name: string;
			field_type: string;
			options: { id: number | string; name: string }[];
		}[] = [];

		(
			Object.keys(filterContent) as Array<keyof typeof filterContent>
		).forEach((key) => {
			if (filterTypes[key]) {
				const data = filterContent[key];
				const currentField = filterTypes[key];
				const name = currentField.name;
				const fieldName = currentField.multiple
					? `filter[${key}][]`
					: `filter[${key}]`;
				const fieldType = currentField.type;
				const options = data;

				items.push({
					name,
					multiple: currentField.multiple,
					field_name: fieldName,
					field_type: fieldType,
					options,
				});
			}
		});

		// Делаем Рубрику первым пунктом фильтра
		items.sort((a) => {
			if (a.name === 'Рубрика') {
				return -1;
			}

			return 0;
		});

		return items;
	});

	const getNextUrlFromNavigation = (navigation: ClientPageNavType['nav']) => {
		return navigation?.next_page_url
			? navigation.next_page_url.replace('/api/v1', '')
			: null;
	};

	const clients = shallowRef<ClientPageClientsType>(content);
	const clientsEl = ref<HTMLElement>();
	const filterWithSearchEl =
		ref<UnwrapNestedRefs<BaseFilterWithSearchElementType>>();
	const nextPageUrl = ref(getNextUrlFromNavigation(content.nav));
	const size = computed(() => {
		return content.nav?.size || 18;
	});

	const scrollToContentTop = () => {
		const filter = filterWithSearchEl.value?.element;
		const content = clientsEl.value;

		if (filter && content) {
			const filterRect = filter.getBoundingClientRect();

			if (filterRect.top === 0) {
				nextTick(() => {
					scrollTo({
						top: -filterRect.height,
						to: content,
						smoth: false,
					});
				});
			}
		}
	};

	const { setFilter, initListsWithQueryData } = useFilter();

	const loadListsData = async (filterQueryUri: string) => {
		// без параметра size api не будет отдавать навигацию
		const uri = filterQueryUri ? `&${filterQueryUri}` : '';
		const listsPath = `/lists/client/?size=${size.value}${uri}`;

		try {
			const data = await useApiOnInteraction<
				ClientPageClientsType & ClientPageNavType & ClientPageCountType
			>(listsPath);

			count.value = data.count;
			clients.value = { items: data.items };
			nextPageUrl.value = getNextUrlFromNavigation(data.nav);
			scrollToContentTop();
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error((error as any).data);
			// fix me to notify
			alert('Не удалось применить фильтр');
		}
	};

	const onChange = (filterQueryUri: string) => {
		setFilter(filterQueryUri);
		loadListsData(filterQueryUri);
	};

	const selectedValues = ref<
		{ field_name: string; field_value: string }[] | null
	>(null);

	// Временный костыль пока не доработают апи(чтобы api page принимал get запросы фильтрации)
	await initListsWithQueryData((queryUri, selectedVal) => {
		selectedValues.value = selectedVal;
		return loadListsData(queryUri);
	});

	const infinityScroll = useInfinityScroll();

	onMounted(() => {
		const element = clientsEl.value;

		if (element) {
			infinityScroll<ClientPageClientsType & ClientPageNavType>({
				element,
				url: nextPageUrl,
				onSuccess: (data) => {
					clients.value = {
						items: [...clients.value.items, ...data.items],
					};
					nextPageUrl.value = getNextUrlFromNavigation(data.nav);
				},
				onError: (error) => {
					// fix me to notify
					// eslint-disable-next-line no-console
					console.error(error);
				},
			});
		}
	});
</script>

<style scoped lang="scss">
	.page-top {
		margin-bottom: 40px;

		@include sm {
			margin-bottom: 20px;
		}
	}
</style>
