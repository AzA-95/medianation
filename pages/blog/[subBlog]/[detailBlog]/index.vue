<template>
	<component
		:is="components[item.component_name]"
		v-for="(item, i) in content"
		:key="i"
		:data="item"
	></component>
</template>

<script setup lang="ts">
	// fix me ServicePopup, нужно уточнить есть ли на проде
	import type { Component } from 'vue';
	import { useRoute } from 'vue-router';
	import type { BlogDetailPageType } from '@/types/pages/blog-detail-page';
	import { useHead } from '#imports';
	import { useApiFetch } from '@/composables/use-api-fetch';
	import { useMetaStore } from '@/stores/meta';
	import { handleError } from '@/helpers/handle-error';
	import BannerBlog from '@/components/base-banner-blog';
	import TextDefault from '@/components/base-text-default';
	import ShareSocials from '@/components/base-share-socials-blog';
	import NewsAnother from '@/components/base-news-slider';
	import FormSubscribe from '@/components/base-form-subscribe-second';

	const components: Record<string, Component> = {
		BannerBlog,
		TextDefault,
		ShareSocials,
		NewsAnother,
		FormSubscribe,
	};

	const route = useRoute();
	const apiPath = `page/blog/${route.params.subBlog}/${route.params.detailBlog}/`;

	const { data, error } = await useApiFetch<BlogDetailPageType>(apiPath);

	if (!data.value) {
		throw handleError({
			statusCode: error.value?.statusCode || 500,
			fatal: true,
			error: error.value,
		});
	}

	const meta = data.value.page.meta;
	const content = data.value.page.content;

	const shareSocialsData = {
		url: meta.og.url,
		title: meta.og.title,
		description: meta.og.description,
		media: meta.og.image,
	};

	// Костыль для добавления данных (шаринга в соц сетях) в компонент BannerBlog
	content.forEach((item) => {
		if (item.component_name === 'BannerBlog') {
			(
				item as typeof item & {
					share_socials_data: typeof shareSocialsData;
				}
			).share_socials_data = shareSocialsData;
		}
	});
	// конец

	// Костыль для добавления компонента ShareSocials после компонента TextDefault
	const indexOfTextDefaultComponent = content.findIndex(
		(c) => c.component_name === 'TextDefault',
	);

	// Нужен для предотврашения вставки дубля(При повторном рендере на клиенте) с ssr
	const indexOfShareSocialsComponent = content.findIndex(
		(c) => c.component_name === 'ShareSocials',
	);

	if (
		indexOfTextDefaultComponent !== -1 &&
		indexOfShareSocialsComponent === -1
	) {
		content.splice(indexOfTextDefaultComponent + 1, 0, {
			id: 'block/share-socials-blog',
			type: 'list/share-socials-blog',
			component_name: 'ShareSocials',
			share_socials_data: shareSocialsData,
		});
	}
	// конец

	const schemaOrgData = (() => {
		const banner =
			content && content[0] && content[0].component_name === 'BannerBlog'
				? content[0]
				: null;

		const author = (() => {
			if (banner && banner.author) {
				const author = banner.author;

				return {
					type:
						author.name.toLowerCase() === 'medianation'
							? 'Organization'
							: 'Person',
					name: author.name,
					picture: author.picture,
				};
			}

			return {
				type: 'Organization',
				name: 'MediaNation',
				picture:
					'https://medianation.ru/images/performance-for-brands.png', // fix me move to public folder
			};
		})();

		const published = banner ? banner.date_published : null;
		const modified =
			banner && published && banner.date_modified !== published
				? banner.date_modified
				: null;

		const defaults = {
			'@context': 'https://schema.org',
			'@type': 'Article',
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': meta.og.url,
			},
			headline: meta.h1,
			description: meta.description || meta.h1,
			image: meta.og.image,
			author: {
				'@type': author.type,
				name: author.name,
				url: author.picture,
			},
			publisher: {
				'@type': 'Organization',
				name: 'MediaNation',
				logo: {
					'@type': 'ImageObject',
					url: 'https://medianation.ru/images/performance-for-brands.png', // fix me move to public folder
				},
			},
		};

		const datePublished = {
			datePublished: published,
		};

		const dateModified = {
			dateModified: modified,
		};

		return JSON.stringify({
			...defaults,
			...(published ? datePublished : {}),
			...(modified ? dateModified : {}),
		});
	})();

	useHead({
		bodyAttrs: {
			class: {
				'menu-light-color': true,
			},
			tagDuplicateStrategy: 'replace',
		},
		script: [
			{
				type: 'application/ld+json',
				innerHTML: schemaOrgData,
			},
		],
	});

	const { setMeta } = useMetaStore();

	setMeta(meta);
</script>
