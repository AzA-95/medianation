<template>
	<div
		class="back-and-share-btns"
		:class="{ fixed: isShareFixed }"
	>
		<BaseBackAndShareBtns :data="BackAndSocialsData" />
	</div>

	<div class="page-top">
		<BasePageTop
			:data="pageTopData"
			:modifier-classes="['fs-small']"
		/>
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
	import { ref, onMounted } from 'vue';
	import { useRoute } from 'vue-router';
	import { useEventListener } from '@/composables/use-event-listener';
	import type { CaseDetailPageType } from '@/types/pages/case-detail-page';
	import { useMetaStore } from '@/stores/meta';
	import { handleError } from '@/helpers/handle-error';
	import { useApiFetch } from '@/composables/use-api-fetch';
	import BaseBackAndShareBtns from '@/components/base-back-and-share-btns';
	import BasePageTop from '@/components/base-page-top';
	import CaseBanner from '@/components/base-case-top';
	import TextDefault from '@/components/base-text-default';
	import CaseOtherServices from '@/components/base-case-other-services';
	import ReviewsClientsGallery from '@/components/base-case-review';
	import CaseGallery from '@/components/base-cases-slider';
	import Form from '@/components/the-footer-form';

	const components: Record<string, Component> = {
		CaseBanner,
		TextDefault,
		CaseOtherServices,
		ReviewsClientsGallery,
		CaseGallery,
		Form,
	};

	const route = useRoute();

	const { data, error } = await useApiFetch<CaseDetailPageType>(
		`page/cases/${route.params.case}/`,
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

	const BackAndSocialsData = {
		back_text: 'Назад в кейсы',
		back_link: '/cases/',
		socials_data: {
			url: meta.og.url,
			title: meta.og.title,
			description: meta.og.description,
			media: meta.og.image,
		},
	};

	const content = data.value.page.content;
	const contentOfBanner = content.find(
		(component): component is (typeof content)[0] => {
			return component.component_name === 'CaseBanner';
		},
	);

	// Костыль для добавления компонента CaseOtherServices после компонента TextDefault
	const indexOfTextDefaultComponent = content.findIndex(
		(c) => c.component_name === 'TextDefault',
	);

	// Нужен для предотврашения вставки дубля(При повторном рендере на клиенте) с ssr
	const indexOfCaseOtherServicesComponent = content.findIndex(
		(c) => c.component_name === 'CaseOtherServices',
	);

	if (
		indexOfTextDefaultComponent !== -1 &&
		indexOfCaseOtherServicesComponent === -1
	) {
		content.splice(indexOfTextDefaultComponent + 1, 0, {
			id: 'block/case-other-services-block',
			type: 'list/case-other-services-block',
			component_name: 'CaseOtherServices',
			client: contentOfBanner!.client,
		});
	}

	const pageTopData = {
		title: contentOfBanner!.name,
		breadcrumbs: contentOfBanner!.breadcrumbs,
	};

	const isShareFixed = ref(false);
	const listener = useEventListener();

	const onScrollShareFixed = () => {
		isShareFixed.value = window.scrollY > window.innerHeight;
	};

	onMounted(() => {
		listener(window, 'scroll', onScrollShareFixed, { passive: true });
	});
</script>

<style scoped lang="scss">
	.page-top {
		margin-bottom: 40px;
	}

	.back-and-share-btns {
		pointer-events: none;
		position: fixed;
		top: 80px;
		z-index: 2;
		opacity: 0;
		transition: 0.3s;

		&.fixed {
			opacity: 1;
			pointer-events: auto;
		}
	}

	@include md-max {
		.back-and-share-btns {
			display: none;
		}
	}
</style>
