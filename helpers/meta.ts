import { computed } from 'vue';
import { useRequestURL } from 'nuxt/app';
import { useHead } from '#imports';
import { useMetaStore } from '@/stores/meta';

export const initMetaTags = () => {
	const url = useRequestURL();
	const metaStore = useMetaStore();

	useHead({
		title: computed(() => metaStore.meta.title!),
		link: [
			{
				key: 'canonical',
				rel: 'canonical',
				href: computed(() => {
					return `${url.origin}${url.pathname}`;
				}),
			},
		],
		meta: [
			{
				key: 'description',
				name: 'description',
				content: computed(() => metaStore.meta.description),
			},
			{
				key: 'og:title',
				property: 'og:title',
				content: computed(() => metaStore.meta?.og?.title),
			},
			{
				key: 'og:description',
				property: 'og:description',
				content: computed(() => metaStore.meta?.og?.description),
			},
			{
				key: 'og:image',
				property: 'og:image',
				content: computed(() => metaStore.meta?.og?.image),
			},
			{
				key: 'og:image:width',
				property: 'og:image:width',
				content: 1200,
			},
			{
				key: 'og:image:height',
				property: 'og:image:height',
				content: 630,
			},
			{
				key: 'og:type',
				property: 'og:type',
				content: computed(() => metaStore.meta?.og?.type),
			},
			{
				key: 'og:url',
				property: 'og:url',
				content: computed(() => metaStore.meta?.og?.url),
			},
			{
				key: 'og:site_name',
				property: 'og:site_name',
				content:
					'MediaNation - агентство интернет-рекламы. Более 14 лет на рынке! Полный спектр digital-услуг от профессионалов',
			},
			{
				key: 'twitter:card',
				property: 'twitter:card',
				content: 'summary_large_image',
			},
			{
				key: 'twitter:title',
				property: 'twitter:title',
				content: computed(() => metaStore.meta?.og?.title),
			},
			{
				key: 'twitter:description',
				property: 'twitter:description',
				content: computed(() => metaStore.meta?.og?.description),
			},
			{
				key: 'twitter:image',
				property: 'twitter:image',
				content: computed(() => metaStore.meta?.og?.image),
			},
			{
				key: 'twitter:domain',
				property: 'twitter:domain',
				content: 'medianation.ru',
			},
			{
				key: 'noindex',
				name: 'robots',
				content: computed(() => {
					const hasNoindex = metaStore.meta?.noindex;
					return hasNoindex ? 'noindex, follow' : undefined;
				}),
			},
		],
	});
};
