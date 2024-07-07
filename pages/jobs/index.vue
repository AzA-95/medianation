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
	import JobsGallery from '@/components/base-jobs-slider';
	import ClientsGallery from '@/components/base-clients-slider';
	import TextDefault from '@/components/base-text-default';
	import TeamGallery from '@/components/base-team';
	import VideoStory from '@/components/base-video-slider';
	import JobsFeatures from '@/components/base-jobs-advantages';
	import PhotoGallery from '@/components/base-photo-slider';
	import Contacts from '@/components/base-contacts';
	import Form from '@/components/the-footer-jobs-form';

	const components: Record<string, Component> = {
		BannerTop,
		JobsGallery,
		ClientsGallery,
		TextDefault,
		TeamGallery,
		VideoStory,
		JobsFeatures,
		PhotoGallery,
		Contacts,
		Form,
	};

	useHead({
		bodyAttrs: {
			class: 'menu-light-color',
		},
	});

	const { data, error } = await useApiFetch<PageType>('page/jobs/');

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

	const content = data.value.page.content;
</script>
