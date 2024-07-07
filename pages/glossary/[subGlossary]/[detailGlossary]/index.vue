<template>
	<div class="page-top">
		<BasePageTop :data="pageTopData" />
	</div>

	<div class="content">
		<div
			class="main-text"
			itemscope
			itemprop="acceptedAnswer"
			itemtype="https://schema.org/Answer"
		>
			<BaseTextDefault
				:data="description"
				:modifier-classes="['without-indent']"
				itemprop="text"
			/>
		</div>

		<div class="container">
			<div class="info-text">
				<p>
					Мы оказываем широкий спектр услуг в области
					интернет-маркетинга и разработки сайтов.
				</p>
				<p>
					<template v-if="service">
						Вы можете заказать услугу
						<NuxtLink :to="service.link">
							{{ service.name }}
						</NuxtLink>
						или получить бесплатную консультацию.
					</template>
					<template v-else>
						Вы можете получить
						<span @click="onShowPopup">
							бесплатную консультацию.
						</span>
					</template>
				</p>
			</div>
		</div>
	</div>

	<ComercialPopup
		:show="isShowPopup"
		@close="onClosePopup"
	/>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { useRoute } from 'vue-router';
	import type { GlossaryDetailPageType } from '@/types/pages/glossary-detail-page';
	import { useMetaStore } from '@/stores/meta';
	import { handleError } from '@/helpers/handle-error';
	import { useApiFetch } from '@/composables/use-api-fetch';
	import BasePageTop from '@/components/base-page-top';
	import BaseTextDefault from '@/components/base-text-default';
	import ComercialPopup from '@/components/comercial-popup';

	const route = useRoute();
	const apiPath = `page/glossary/${route.params.subGlossary}/${route.params.detailGlossary}/`;

	const { data, error } = await useApiFetch<GlossaryDetailPageType>(apiPath);

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

	const contentTop = data.value.page.content[0];
	const description = data.value.page.content[1];
	const service = contentTop.service;

	const pageTopData = {
		title: meta.h1,
		breadcrumbs: contentTop.breadcrumbs,
	};

	const isShowPopup = ref(false);

	const onShowPopup = () => {
		isShowPopup.value = true;
	};

	const onClosePopup = () => {
		isShowPopup.value = false;
	};
</script>

<style scoped lang="scss">
	.page-top {
		margin-bottom: 56px;

		@include md {
			margin-bottom: 40px;
		}

		@include sm {
			margin-bottom: 20px;
		}
	}

	.content {
		padding: var(--vertical-indent) 0;
		background: #fff;
	}

	.main-text {
		margin-bottom: 40px;

		@include sm {
			margin-bottom: 24px;
		}
	}

	.info-text {
		color: #151515;
		font-size: 24px;
		font-weight: 500;
		line-height: 1.25;
		letter-spacing: -0.02em;
		padding: 40px;
		background: #f9f9f9;

		p {
			margin: 0 0 16px;

			&:last-child {
				margin-bottom: 0;
			}
		}

		span {
			cursor: pointer;
			color: #ff461e;
		}

		a {
			color: #ff461e;
			text-decoration: none;

			&:hover {
				text-decoration: underline;
			}
		}

		@include lg {
			& {
				font-size: 22px;
				line-height: 1.36;
			}
		}

		@include md {
			& {
				font-size: 20px;
				line-height: 1.5;
			}
		}

		@include sm {
			.info-text {
				font-size: 16px;
				line-height: 1.5;
				padding: 24px 16px;
			}
		}
	}
</style>
