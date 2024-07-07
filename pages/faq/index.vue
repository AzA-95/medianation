<template>
	<div class="page-top">
		<BasePageTop
			:data="pageTopData"
			:modifier-classes="['faq-page']"
		/>
	</div>

	<div class="content">
		<div class="tags">
			<BaseTags
				:data="tags"
				@change="onChange"
			/>
		</div>

		<div
			ref="questionsWithAnswersEl"
			class="questions-with-answers"
		>
			<div class="container">
				<BaseAccordion
					v-for="(item, index) in questionsWithAnswers"
					:key="index"
					:data="item"
					:show-error-text="true"
				/>
			</div>
		</div>
	</div>

	<div
		v-if="formData"
		class="form"
	>
		<TheFooterForm
			:data="formData"
			:modifier-classes="['title-width-smaller']"
		/>
	</div>
</template>

<script setup lang="ts">
	import { ref, shallowRef, computed, onMounted } from 'vue';
	import type {
		FaqPageType,
		FaqPageNavType,
		FaqPageCountType,
		FaqPageItemsType,
	} from '@/types/pages/faq-page';
	import { useMetaStore } from '@/stores/meta';
	import { handleError } from '@/helpers/handle-error';
	import { useApiFetch } from '@/composables/use-api-fetch';
	import { useFilter } from '@/composables/use-filter';
	import { useApiOnInteraction } from '@/composables/use-api-on-interaction';
	import { useInfinityScroll } from '@/composables/use-infinity-scroll';
	import BasePageTop from '@/components/base-page-top';
	import BaseTags from '@/components/base-tags';
	import BaseAccordion from '@/components/base-accordion';
	import TheFooterForm from '@/components/the-footer-form';

	const { data, error } = await useApiFetch<FaqPageType>('page/faq/');

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
		};
	});

	const activeTagId = ref<string | null>(null);

	const tags = computed(() => {
		const items = content.filter.type;

		return {
			items: items.map((item) => {
				return {
					...item,
					current: activeTagId.value === item.id,
				};
			}),
		};
	});

	const formData = computed(() => {
		const formData = data.value?.page.content[1];

		if (formData) {
			return {
				...formData,
				captionNew: formData.caption,
			};
		}

		return null;
	});

	const getNextUrlFromNavigation = (navigation: FaqPageNavType['nav']) => {
		return navigation?.next_page_url
			? navigation.next_page_url.replace('/api/v1', '')
			: null;
	};

	const questionsWithAnswers = shallowRef(content.items);
	const questionsWithAnswersEl = ref<HTMLElement>();
	const nextPageUrl = ref(getNextUrlFromNavigation(content.nav));
	const size = computed(() => {
		return content.nav?.size || 20;
	});

	const { getQueryStringFromObject, setFilter, initListsWithQueryData } =
		useFilter();

	const loadListsData = async (filterQueryUri: string) => {
		// без параметра size api не будет отдавать навигацию
		const uri = filterQueryUri ? `&${filterQueryUri}` : '';
		const listsPath = `/lists/faq/?size=${size.value}${uri}`;

		try {
			const data = await useApiOnInteraction<
				FaqPageItemsType & FaqPageNavType & FaqPageCountType
			>(listsPath);

			count.value = data.count;
			questionsWithAnswers.value = data.items;
			nextPageUrl.value = getNextUrlFromNavigation(data.nav);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error((error as any).data);
			// fix me to notify
			alert('Не удалось применить фильтр');
		}
	};

	const filterFieldName = 'filter[type]';

	const onChange = (id: string | number) => {
		activeTagId.value = activeTagId.value === id ? null : `${id}`;

		let queryUri = '';

		if (activeTagId.value !== null) {
			queryUri = getQueryStringFromObject({ [filterFieldName]: `${id}` });
		}

		setFilter(queryUri);
		loadListsData(queryUri);
	};

	// Временный костыль пока не доработают апи(чтобы api page принимал get запросы фильтрации)
	await initListsWithQueryData((queryUri, selectedValues) => {
		activeTagId.value = null;

		selectedValues.forEach((item) => {
			if (item.field_name === filterFieldName) {
				activeTagId.value = item.field_value;
			}
		});

		return loadListsData(queryUri);
	});

	const infinityScroll = useInfinityScroll();

	onMounted(() => {
		const element = questionsWithAnswersEl.value;

		if (element) {
			infinityScroll<FaqPageItemsType & FaqPageNavType>({
				element,
				url: nextPageUrl,
				onSuccess: (data) => {
					questionsWithAnswers.value = [
						...questionsWithAnswers.value,
						...data.items,
					];

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

<style scoped lang="scss" src="./style.scss"></style>
