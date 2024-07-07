<template>
	<div class="page-top">
		<BasePageTop :data="pageTopData" />
	</div>

	<!-- Не врапить элемент доп элементом(сломается position: sticky) -->
	<BaseFilterWithSearch
		ref="filterWithSearchEl"
		:filter="filterParams"
		:selected-values="selectedValues"
		@change="onChange"
	/>

	<div
		ref="casesEl"
		class="cases"
	>
		<template
			v-for="(item, index) in cases"
			:key="index"
		>
			<div
				class="case"
				:class="[
					item.type === 'legendary' ? `case_${item.type}` : null,
				]"
			>
				<BaseCaseCard
					v-if="item.type !== 'legendary'"
					:data="item"
				/>
				<BaseCaseCardBig
					v-else
					:data="item"
				/>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
	import type { UnwrapNestedRefs } from 'vue';
	import { ref, shallowRef, computed, onMounted, nextTick } from 'vue';
	import type {
		CasesPageType,
		CasesPageNavType,
		CasesPageCasesType,
		CasesPageCountType,
	} from '@/types/pages/cases-page';
	import { scrollTo } from '@/utils/ui';
	import { useMetaStore } from '@/stores/meta';
	import { handleError } from '@/helpers/handle-error';
	import { useApiFetch } from '@/composables/use-api-fetch';
	import { useFilter } from '@/composables/use-filter';
	import { useAuthorFilter } from '@/composables/use-author-filter';
	import { useInfinityScroll } from '@/composables/use-infinity-scroll';
	import { useApiOnInteraction } from '@/composables/use-api-on-interaction';
	import BasePageTop from '@/components/base-page-top';
	import type { BaseElementType as BaseFilterWithSearchElementType } from '@/components/base-filter-with-search/type';
	import BaseFilterWithSearch from '@/components/base-filter-with-search';
	import BaseCaseCard from '@/components/base-case-card';
	import BaseCaseCardBig from '@/components/base-case-card-big';

	const { data, error } = await useApiFetch<CasesPageType>('page/cases/');

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

	const {
		getSelectedFilter: getSelectedAuthorFilter,
		removeFilterIfMatch: removeFilterAuthorIfMatch,
	} = useAuthorFilter();
	const authorFilterData = getSelectedAuthorFilter();

	const filterParams = computed(() => {
		const filterContent = content.filter;
		// fix me api
		// По хорошему надо вынести в апи названия полей и тип поля.
		// Но пока апи сделали так поэтому пишем свои костыли
		const filterTypes = {
			service: {
				name: 'Услуга',
				multiple: true,
				type: 'checkbox',
			},
			activity: {
				name: 'Отрасль',
				multiple: true,
				type: 'checkbox',
			},
		};

		const items: {
			name: string;
			multiple: boolean;
			field_name: string;
			field_type: string;
			options?: { id: number | string; name: string }[];
			value?: string;
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

		items.push({
			name: 'По дате',
			multiple: false,
			field_name: 'sort[date]',
			field_type: 'radio',
			options: [
				{
					id: 'asc',
					name: 'Сначала старые',
				},
				{
					id: 'desc',
					name: 'Сначала новые',
				},
			],
		});

		if (authorFilterData) {
			items.unshift({
				name: authorFilterData.name,
				multiple: false,
				field_name: authorFilterData.field_name,
				field_type: 'hidden',
				value: authorFilterData.field_value,
			});
		}

		return items;
	});

	const getNextUrlFromNavigation = (navigation: CasesPageNavType['nav']) => {
		return navigation?.next_page_url
			? navigation.next_page_url.replace('/api/v1', '')
			: null;
	};

	const cases = shallowRef(content.items);
	const casesEl = ref<HTMLElement>();
	const filterWithSearchEl =
		ref<UnwrapNestedRefs<BaseFilterWithSearchElementType>>();
	const nextPageUrl = ref(getNextUrlFromNavigation(content.nav));
	const size = computed(() => {
		return content.nav?.size || 20;
	});

	const scrollToContentTop = () => {
		const filter = filterWithSearchEl.value?.element;
		const content = casesEl.value;

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

	const { getSelectedFilter, setFilter, initListsWithQueryData } =
		useFilter();

	const loadListsData = async (filterQueryUri: string) => {
		// без параметра size api не будет отдавать навигацию
		const uri = filterQueryUri ? `&${filterQueryUri}` : '';
		const listsPath = `/lists/casesex/?size=${size.value}${uri}`;

		try {
			const data = await useApiOnInteraction<
				CasesPageCasesType & CasesPageNavType & CasesPageCountType
			>(listsPath);

			count.value = data.count;
			cases.value = data.items;
			nextPageUrl.value = getNextUrlFromNavigation(data.nav);
			scrollToContentTop();
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error((error as any).data);
			// fix me to notify
			alert('Не удалось применить фильтр');
		}
	};

	const initAuthorFilter = () => {
		if (authorFilterData) {
			const queryUri = new URLSearchParams();

			queryUri.append(
				authorFilterData.field_name,
				authorFilterData.field_value,
			);

			const filterValues = getSelectedFilter();

			if (filterValues) {
				filterValues.forEach((item) => {
					queryUri.append(item.field_name, item.field_value);
				});
			}

			setFilter(queryUri.toString());
		}
	};

	initAuthorFilter();

	const onChange = (filterQueryUri: string) => {
		removeFilterAuthorIfMatch(filterQueryUri);
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
		const element = casesEl.value;

		if (element) {
			infinityScroll<CasesPageCasesType & CasesPageNavType>({
				element,
				url: nextPageUrl,
				onSuccess: (data) => {
					cases.value = [...cases.value, ...data.items];
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

	.cases {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(calc(400px), 1fr));
		grid-auto-rows: auto;
		grid-auto-flow: dense;
	}

	.case {
		display: flex; // strech child to full height
		grid-row-end: span 2;
		grid-column-end: span 2;
		border-right: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
		overflow: hidden;

		&_legendary {
			grid-row-end: span 4;
			grid-column-end: span 4;
		}
	}

	@include lg-max {
		.cases {
			grid-template-columns: repeat(2, 50%);
			grid-auto-flow: row dense;
		}

		.case {
			grid-column-end: span 1;

			&_legendary {
				grid-column-end: span 2;
			}
		}
	}

	@media (max-width: 1000px) {
		.cases {
			display: block;
		}
	}

	@include sm {
		.articles {
			display: block;
		}

		.article {
			min-height: 250px;

			&.medium,
			&.large {
				min-height: 420px;
			}
		}
	}
</style>
