<template>
	<div class="page-top">
		<BasePageTop :data="pageTopData" />
	</div>

	<div class="content">
		<div class="tags">
			<BaseTags :data="tags" />
		</div>
		<div class="sort-letters">
			<BaseSortAlphabets
				:letters="letters"
				:active-letter="activeLetter"
				@letter-clicked="onLetterClicked"
			/>
		</div>
		<div class="glossaries">
			<BaseGlossaries :data="glossaries" />
		</div>
	</div>

	<div
		v-if="nav && nav.max_page > 1"
		class="pagination"
	>
		<BasePagination
			:nav="nav"
			:is-loading-page="isLoadingPage"
			:is-show-load-indicator-btn="isShowLoadIndicatorBtn"
			@pagination-changed="onPaginationChanged"
			@load-more="onLoadMore"
		/>
	</div>
</template>

<script setup lang="ts">
	import { ref, shallowRef, computed } from 'vue';
	import { useRoute } from 'vue-router';
	import type {
		GlossaryPageType,
		GlossaryPageNavType,
		GlossaryPageCountType,
		GlossaryPageGlossariesType,
	} from '@/types/pages/glossary-page';
	import { useMetaStore } from '@/stores/meta';
	import { handleError } from '@/helpers/handle-error';
	import { useApiFetch } from '@/composables/use-api-fetch';
	import { useFilter } from '@/composables/use-filter';
	import { useApiOnInteraction } from '@/composables/use-api-on-interaction';
	import BasePageTop from '@/components/base-page-top';
	import BaseTags from '@/components/base-tags';
	import BaseSortAlphabets from '@/components/base-sort-alphabets';
	import BaseGlossaries from '@/components/base-glossaries';
	import BasePagination from '@/components/base-pagination';

	const route = useRoute();
	const subGlossary = route.params.subGlossary;
	const apiPath = subGlossary
		? `page/glossary/${subGlossary}/`
		: 'page/glossary/';

	const { data, error } = await useApiFetch<GlossaryPageType>(apiPath);

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

	const tags = content.menu;
	const letters = shallowRef(['Все', ...content.filter.letters]);
	const activeLetter = ref('Все');
	// передаем через {items: content.items } чтобы не передать компоненту ничего лишнего
	const glossaries = shallowRef({ items: content.items });
	const nav = ref<GlossaryPageNavType['nav'] | null>(content.nav);
	const size = computed(() => {
		return content.nav?.size || 10;
	});

	const activeSectionId = computed(() => {
		if (subGlossary) {
			const section = content.menu.items.find((item) => {
				return item.current === true;
			});

			return section?.id || null;
		}

		return null;
	});

	const setNav = (data: GlossaryPageNavType['nav'] | []) => {
		if (data && typeof data === 'object') {
			nav.value = data as GlossaryPageNavType['nav'];

			return;
		}

		nav.value = null;
	};

	const setGlossaries = (
		data: GlossaryPageGlossariesType['items'],
		type: 'add' | 'replace' = 'replace',
	) => {
		if (type === 'replace') {
			glossaries.value = {
				items: data,
			};

			return;
		}

		glossaries.value = {
			items: [...glossaries.value.items, ...data],
		};
	};

	const loadListsData = async (
		filterQueryUri: string,
		type: 'replace' | 'add' = 'replace',
	) => {
		// без параметра size api не будет отдавать навигацию
		const uri = filterQueryUri ? `&${filterQueryUri}` : '';
		const filterSection = activeSectionId.value
			? `&filter[section]=${activeSectionId.value}`
			: '';
		const listsPath = `/lists/glossary/?size=${size.value}${filterSection}${uri}`;

		try {
			const data = await useApiOnInteraction<
				GlossaryPageGlossariesType &
					GlossaryPageNavType &
					GlossaryPageCountType
			>(listsPath);

			count.value = data.count;
			setNav(data.nav);
			setGlossaries(data.items, type);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error((error as any).data);
			// fix me to notify
			alert('Не удалось применить фильтр');
		}
	};

	const { getQueryStringFromObject, setFilter, initListsWithQueryData } =
		useFilter();

	const filterLetterFieldName = 'filter[letter]';

	const onLetterClicked = (letter: string) => {
		const prevActiveLetter = activeLetter.value;

		let queryUri = '';

		if (prevActiveLetter === letter) {
			activeLetter.value = letters.value[0]; // Сбрасываем фильтр на значение "Все"
		} else {
			activeLetter.value = letter;

			// Меняем queryUri если значение не "Все"
			if (activeLetter.value !== letters.value[0]) {
				queryUri = getQueryStringFromObject({
					[filterLetterFieldName]: `${letter}`,
				});
			}
		}

		setFilter(queryUri);
		loadListsData(queryUri);
	};

	const scrollToTop = () => {
		window.scroll(0, 0);
	};

	const isLoadingPage = ref<null | number>(null);

	const onPaginationChanged = (page: number) => {
		isLoadingPage.value = page;

		let queryUri = '';

		// Добавляем в queryUri letter если значение не "Все"
		if (activeLetter.value !== letters.value[0]) {
			queryUri = getQueryStringFromObject({
				[filterLetterFieldName]: `${activeLetter.value}`,
				page: `${page}`,
			});
		} else {
			queryUri = getQueryStringFromObject({
				page: `${page}`,
			});
		}

		setFilter(queryUri);
		loadListsData(queryUri).finally(() => {
			scrollToTop();
			isLoadingPage.value = null;
		});
	};

	const isShowLoadIndicatorBtn = ref(false);

	const onLoadMore = () => {
		isShowLoadIndicatorBtn.value = true;
		const page = nav.value!.current_page + 1;

		let queryUri = '';

		// Добавляем в queryUri letter если значение не "Все"
		if (activeLetter.value !== letters.value[0]) {
			queryUri = getQueryStringFromObject({
				[filterLetterFieldName]: `${activeLetter.value}`,
				page: `${page}`,
			});
		} else {
			queryUri = getQueryStringFromObject({
				page: `${page}`,
			});
		}

		setFilter(queryUri);
		loadListsData(queryUri, 'add').finally(() => {
			isShowLoadIndicatorBtn.value = false;
		});
	};

	// Временный костыль пока не доработают апи(чтобы api page принимал get запросы фильтрации)
	await initListsWithQueryData((queryUri, selectedValues) => {
		selectedValues.forEach((item) => {
			if (item.field_name === filterLetterFieldName) {
				activeLetter.value = item.field_value;
			}
		});

		return loadListsData(queryUri);
	});
</script>

<style scoped lang="scss">
	.page-top {
		margin-bottom: 40px;

		@include sm {
			margin-bottom: 20px;
		}
	}

	.content {
		padding: 64px 0;
		background: #fff;
	}

	.tags {
		margin-bottom: 40px;
	}

	.sort-letters {
		margin-bottom: 16px;
	}
</style>
