<template>
	<div class="page-top">
		<BasePageTop
			:data="pageTopData"
			:modifier-classes="['jobs-detail-page']"
		/>
	</div>

	<div class="content">
		<component
			:is="components[item.component_name]"
			v-for="(item, i) in content"
			:key="i"
			:data="item"
			:modifier-classes="
				item.component_name === 'TextDefault'
					? ['without-indent']
					: null
			"
		></component>
	</div>
</template>

<script setup lang="ts">
	import type { Component } from 'vue';
	import { useRoute } from 'vue-router';
	import { useRequestURL } from 'nuxt/app';
	import type { JobDetailPageType } from '@/types/pages/job-detail-page';
	import { useMetaStore } from '@/stores/meta';
	import { handleError } from '@/helpers/handle-error';
	import { useApiFetch } from '@/composables/use-api-fetch';
	import BasePageTop from '@/components/base-page-top';
	import TextDefault from '@/components/base-text-default';
	import Form from '@/components/the-footer-jobs-form';

	const components: Record<string, Component> = {
		TextDefault,
		Form,
	};

	// Можно было бы парсить контент с апи(написав костыли вместо своего апи страниц)
	// но не стал чтобы был стимул выноса страниц к апи
	const route = useRoute();
	const apiPath = `/front-api/jobs/${route.params.detailJob}.json`;
	const baseURL = useRequestURL().origin;
	const { data, error } = await useApiFetch<JobDetailPageType>(apiPath, {
		baseURL,
	});

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
	const topData = pageContent[0];

	const pageTopData = {
		city: topData.city,
		title: topData.name,
		breadcrumbs: topData.breadcrumbs,
	};

	const content = pageContent.filter((item) => {
		return item.component_name !== 'TopData';
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
