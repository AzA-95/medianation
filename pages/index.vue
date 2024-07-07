<template>
	<MainDescription :data="mainDescriptionComponentData!" />

	<div class="main-page-content">
		<div class="main-page-circle-icon">
			<BaseCircleRotatedIcon />
		</div>

		<component
			:is="components[item.component_name]"
			v-for="(item, i) in otherContent"
			:key="i"
			:data="item"
		></component>
	</div>
</template>

<script setup lang="ts">
	import type { Component } from 'vue';
	import { useHead } from '#imports';
	import type { MainPageType } from '@/types/pages/main-page';
	import { useApiFetch } from '@/composables/use-api-fetch';
	import { useMetaStore } from '@/stores/meta';
	import { handleError } from '@/helpers/handle-error';
	import MainDescription from '@/components/base-main-promo-text';
	import BaseCircleRotatedIcon from '@/components/base-circle-rotated-icon';
	import PromoSlider from '@/components/base-services-slider';
	import ServicesMainGallery from '@/components/base-services-tab';
	import PromoGallery from '@/components/base-offer';
	import ReviewsClientsGallery from '@/components/base-reviews-client';
	import VideoGallery from '@/components/base-video-sliders';
	import CaseMainList from '@/components/base-results-our-works';
	import Certificate from '@/components/base-certificates-second';
	import ServicesLinksMain from '@/components/base-promotion-cost';
	import TeamGallery from '@/components/base-team';
	import Form from '@/components/the-footer-form';

	const components: Record<string, Component> = {
		PromoSlider,
		ServicesMainGallery,
		PromoGallery,
		ReviewsClientsGallery,
		VideoGallery,
		CaseMainList,
		Certificate,
		ServicesLinksMain,
		TeamGallery,
		Form,
	};

	useHead({
		bodyAttrs: {
			class: 'main-page',
		},
	});

	const { data, error } = await useApiFetch<MainPageType>('page/index/');

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

	const contents = data.value.page.content;

	const mainDescriptionComponentData = contents.find(
		(item): item is (typeof contents)[0] => {
			return item.component_name === 'MainDescription';
		},
	);

	const otherContent = contents.filter((content) => {
		return content.component_name !== 'MainDescription';
	});
</script>

<style scoped lang="scss">
	.main-page-content {
		position: relative;
		z-index: 3;
		padding-bottom: 1px; // fix margin collapse
		background: var(--color-sixth);
	}

	.main-page-circle-icon {
		max-width: 1600px;
		width: 100%;
		position: absolute;
		top: -60px;
		left: 50%;
		z-index: 3;
		transform: translateX(-50%);
		display: flex;
		justify-content: flex-end;
		padding-right: 424px;
		margin: 0 auto;

		@include lg {
			padding-right: 316px;
		}

		@include md {
			top: -48px;
			padding-right: 208px;
		}

		@include sm {
			top: -32px;
			padding-right: 28px;
		}
	}
</style>
