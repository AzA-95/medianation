<template>
	<div class="page-top">
		<BasePageTop :data="pageTopData" />
	</div>

	<component
		:is="components[item.component_name]"
		v-for="(item, i) in content"
		:key="i"
		:data="item"
	></component>
</template>

<script setup lang="ts">
	import type { Component } from 'vue';
	import type { ServicesPageType } from '@/types/pages/services-page';
	import { useApiFetch } from '@/composables/use-api-fetch';
	import { useMetaStore } from '@/stores/meta';
	import { handleError } from '@/helpers/handle-error';
	import BasePageTop from '@/components/base-page-top';
	import ServicesList from '@/components/base-services-list';
	import TeamGallery from '@/components/base-team';
	import Form from '@/components/the-footer-form';

	const components: Record<string, Component> = {
		ServicesList,
		TeamGallery,
		Form,
	};

	const { data, error } =
		await useApiFetch<ServicesPageType>('page/services/');

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

	const serviceListData = content.find(
		(item): item is (typeof content)[0] => {
			return item.component_name === 'ServicesList';
		},
	);

	const pageTopData = {
		title: serviceListData!.name,
		breadcrumbs: serviceListData!.breadcrumbs,
		count: serviceListData!.count,
	};
</script>

<style scoped lang="scss">
	.page-top {
		margin-bottom: 40px;

		@include sm {
			margin-bottom: 20px;
		}
	}
</style>
