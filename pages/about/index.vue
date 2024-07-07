<template>
	<component
		:is="components[item.component_name]"
		v-for="(item, i) in content"
		:key="i"
		:data="item"
	></component>
</template>

<script setup lang="ts">
	import type { Component } from 'vue';
	import { useHead } from '#imports';
	import type { PageType } from '@/types/pages/page';
	import { useApiFetch } from '@/composables/use-api-fetch';
	import { useMetaStore } from '@/stores/meta';
	import { handleError } from '@/helpers/handle-error';
	import BannerTop from '@/components/base-banner-video';
	import Certificate from '@/components/base-certificates-about';
	import TeamGallery from '@/components/base-team';
	import VideoStory from '@/components/base-video-reviews';
	import NewsGallery from '@/components/base-conferences-slider';
	import Form from '@/components/the-footer-form';

	const components: Record<string, Component> = {
		BannerTop,
		Certificate,
		TeamGallery,
		VideoStory,
		NewsGallery,
		Form,
	};

	useHead({
		bodyAttrs: {
			class: 'menu-light-color',
		},
	});

	const { data, error } = await useApiFetch<PageType>('page/about/');

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

	const pageContent = data.value.page.content;

	const dataOfComponentHistory = pageContent.find((item) => {
		return item.component_name === 'History';
	});

	const content = pageContent.filter((item) => {
		if (item.component_name === 'BannerTop') {
			item.title = meta.h1;
		}

		if (item.component_name === 'Certificate') {
			item.histories = dataOfComponentHistory;
		}

		// Удаляем компонент(History) так как контент передается в компонент Certificate смотри выше
		return item.component_name !== 'History';
	});
</script>
