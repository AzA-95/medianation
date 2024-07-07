<template>
	<div class="page-top">
		<BasePageTop
			:data="pageTopData"
			:modifier-classes="
				subBlog ? ['fs-small', 'blog-sub'] : ['fs-small', 'blog-main']
			"
			@button-clicked="onSubscribeBtnClicked"
		/>
	</div>

	<!-- Не врапить элемент доп элементом(сломается position: sticky) -->
	<BaseFilterWithSearch
		ref="filterWithSearchEl"
		:filter="filterParams"
		:selected-values="selectedValues"
		:show-search="true"
		@change="onChange"
	/>

	<div
		ref="articlesEl"
		class="articles"
	>
		<template
			v-for="(item, index) in articles"
			:key="index"
		>
			<div
				v-if="index === 11"
				ref="subscribeFormEl"
				class="subscribe-form"
			>
				<BaseSubscribeForm
					:data="subscribeForm"
					:fixed-top="150"
				/>
			</div>
			<div
				class="article"
				:class="[item.show_type]"
			>
				<BaseArticleCard :data="item" />
			</div>
		</template>

		<BaseSubscribePopup
			:data="subscribeForm"
			:show="isShowPopup"
			@close="onClosePopup"
		/>
	</div>
</template>

<script setup lang="ts">
	import type { UnwrapNestedRefs } from 'vue';
	import { ref, shallowRef, computed, onMounted, nextTick } from 'vue';
	import { useRoute } from 'vue-router';
	import type {
		BlogPageType,
		BlogPageNavType,
		BlogPageCountType,
		BlogPageArticlesType,
	} from '@/types/pages/blog-page';
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
	import BaseArticleCard from '@/components/base-article-card';
	import BaseSubscribeForm from '@/components/base-form-subscribe';
	import BaseSubscribePopup from '@/components/base-subscribe-popup';

	const route = useRoute();
	const subBlog = route.params.subBlog;
	const apiPath = subBlog ? `page/blog/${subBlog}/` : 'page/blog/';

	const { data, error } = await useApiFetch<BlogPageType>(apiPath);

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
			button_name: 'Подписаться',
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
				name: 'Темы',
				type: 'checkbox',
				multiple: true,
				sort: (data: { id: number | string; name: string }[]) => {
					return data.sort((a, b) => {
						const firstWord = a.name.trim().toLowerCase();
						const secondWord = b.name.trim().toLowerCase();

						return firstWord.localeCompare(secondWord);
					});
				},
				filter: null,
			},
			date: {
				name: 'Период',
				type: 'radio',
				multiple: false,
				sort: null,
				filter: null,
			},
			type: {
				name: 'Тип',
				type: 'radio',
				multiple: false,
				sort: null,
				filter: (data: { id: number | string; name: string }[]) => {
					// fix me api Костыль, скрываем так как нету контента у кейсов
					return data.filter((item) => {
						return item.name !== 'Кейсы';
					});
				},
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

		// fix me api Костыль. Добавляем рубрику в фильтр
		const filterCategories = content.menu.items;

		items.push({
			name: 'Рубрика',
			multiple: false,
			field_name: 'filter[section]',
			field_type: 'radio',
			options: filterCategories,
		});

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
				const options = (() => {
					const sortedData = currentField.sort
						? currentField.sort(data)
						: data;
					const filteredData = currentField.filter
						? currentField.filter(sortedData)
						: sortedData;

					return filteredData;
				})();

				items.push({
					name,
					multiple: currentField.multiple,
					field_name: fieldName,
					field_type: fieldType,
					options,
				});
			}
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

	const subscribeForm = computed(() => {
		return content.subscribe_form;
	});

	const getNextUrlFromNavigation = (navigation: BlogPageNavType['nav']) => {
		return navigation?.next_page_url
			? navigation.next_page_url.replace('/api/v1', '')
			: null;
	};

	const articles = shallowRef(content.items);
	const articlesEl = ref<HTMLElement>();
	const filterWithSearchEl =
		ref<UnwrapNestedRefs<BaseFilterWithSearchElementType>>();
	const nextPageUrl = ref(getNextUrlFromNavigation(content.nav));

	const scrollToContentTop = () => {
		const filter = filterWithSearchEl.value?.element;
		const content = articlesEl.value;

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

	const baseListsUrl = content.base_url.replace('/api/v1', '');
	const hasQueryUrl = !!baseListsUrl.includes('?');
	const delimetrQuery = hasQueryUrl ? '&' : '?';

	const loadListsData = async (filterQueryUri: string) => {
		const listsPath = filterQueryUri
			? `${baseListsUrl}${delimetrQuery}${filterQueryUri}`
			: baseListsUrl;

		try {
			const data = await useApiOnInteraction<
				BlogPageArticlesType & BlogPageNavType & BlogPageCountType
			>(listsPath);

			count.value = data.count;
			articles.value = data.items;
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

	const isShowPopup = ref(false);
	// сделал массиовом так как ссылается внутри v-for
	const subscribeFormEl = ref<HTMLElement[]>();

	const onShowPopup = () => {
		isShowPopup.value = true;
	};

	const onClosePopup = () => {
		isShowPopup.value = false;
	};

	const onSubscribeBtnClicked = () => {
		const form = subscribeFormEl.value;

		if (form && form[0]) {
			const filterHeight =
				filterWithSearchEl.value?.element?.offsetHeight || 0;

			scrollTo({
				top: -filterHeight,
				to: form[0],
			});
		} else {
			onShowPopup();
		}
	};

	const infinityScroll = useInfinityScroll();

	onMounted(() => {
		const element = articlesEl.value;

		if (element) {
			infinityScroll<BlogPageArticlesType & BlogPageNavType>({
				element,
				url: nextPageUrl,
				onSuccess: (data) => {
					articles.value = [...articles.value, ...data.items];
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

	.articles {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		grid-auto-rows: auto;
		grid-auto-flow: dense;
	}

	.article {
		display: flex; // strech child to full height
		min-height: 300px;

		&.medium {
			grid-row-end: span 2;
			grid-column-end: span 1;
		}

		&.large {
			grid-row-end: span 2;
			grid-column-end: span 2;
		}
	}

	.subscribe-form {
		display: flex; // strech child to full height
		grid-row-end: span 2;
		grid-column-end: span 2;
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
