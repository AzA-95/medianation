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
	import { useRoute } from 'vue-router';
	import type { PageType } from '@/types/pages/page';
	import { useMetaStore } from '@/stores/meta';
	import { handleError } from '@/helpers/handle-error';
	import { useApiFetch } from '@/composables/use-api-fetch';
	import AuthorBanner from '@/components/base-author-banner';
	import NewsAnother from '@/components/base-articles-grid';
	import Certificate from '@/components/base-awards-with-certificates';
	import CaseGallery from '@/components/base-cases-slider';
	import MenuList from '@/components/base-desc-with-menu-list';
	import Form from '@/components/the-footer-form';

	const components: Record<string, Component> = {
		AuthorBanner,
		NewsAnother,
		Certificate,
		CaseGallery,
		MenuList,
		Form,
	};

	const route = useRoute();

	const { data, error } = await useApiFetch<PageType>(
		`page/authors/${route.params.author}/`,
	);

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
