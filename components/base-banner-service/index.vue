<template>
	<section
		class="base-banner-service"
		:style="[
			{ '--background-image': `url('${backgroundImage}')` },
			'--background-image-small'
				? `url('${backgroundImageSmall}')`
				: null,
		]"
	>
		<div class="container">
			<div class="row">
				<div class="col-left">
					<div class="breadcrumbs">
						<BaseBreadcrumbs
							:breadcrumbs="breadcrumbs"
							:modifier-classes="['white']"
						/>
					</div>
					<h1 class="title">{{ title }}</h1>
					<div
						v-if="text"
						class="text"
						v-html="text"
					></div>
					<div class="bottom">
						<div
							v-if="priceData"
							class="price"
						>
							<div class="price__title">
								{{ priceData.title }}
							</div>
							<div class="price__cost">{{ priceData.price }}</div>
						</div>

						<div class="btn-cols">
							<div class="btn">
								<BaseButton
									@click="
										scrollToForm
											? onScrollToForm()
											: onShowPopup()
									"
								>
									{{ btnName }}
								</BaseButton>
							</div>

							<div
								v-if="discount"
								class="discount"
							>
								<div
									v-if="discount.value"
									class="discount__precentage"
								>
									{{ discount.value }}
								</div>
								<div
									v-else
									class="discount__icon"
								></div>

								<div class="discount__text">
									{{ discount.name }}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-right">
					<div
						v-if="awards"
						class="awards"
					>
						<div
							v-if="showSaleIcon"
							class="sale-icon"
						>
							<div class="sale-icon__pic">
								<img
									:src="saleIcon"
									alt="sale"
								/>
							</div>
							<div class="sale-icon__text">
								Бессрочная скидка на пакеты технической
								поддержки всего сайта после интеграции
								Searchbooster
							</div>
						</div>

						<div
							v-for="(award, index) in awards"
							:key="index"
							class="award"
						>
							<BaseAwardVertical
								:data="award"
								:use-lazy-image="false"
								:modifier-classes="['white', 'small']"
							/>
						</div>
					</div>

					<div
						v-if="results"
						class="results"
					>
						<div
							v-if="showSaleIcon"
							class="sale-icon"
						>
							<div class="sale-icon__pic">
								<img
									:src="saleIcon"
									alt="sale"
								/>
							</div>
							<div class="sale-icon__text">
								Бессрочная скидка на пакеты технической
								поддержки всего сайта после интеграции
								Searchbooster
							</div>
						</div>

						<div
							v-for="(result, index) in results"
							:key="index"
							class="results__item"
						>
							<div class="result">
								<div
									class="result__pic"
									:style="`
										--img-width: 50;
										--img-height: 50;
									`"
								>
									<span>
										<img
											:src="result.icon"
											alt="icon"
										/>
									</span>
								</div>
								<div class="result__content">
									<div class="result__name">
										{{ result.name }}
									</div>
									<div class="result__text">
										{{ result.text }}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<ComercialPopup
			:show="isShowPopup"
			@close="onClosePopup"
		/>
	</section>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { ref, computed } from 'vue';
	import type { BaseType, BaseAwardsType, BaseResultsType } from './type';
	import saleIcon from './images/sale-icon.svg';
	import { scrollTo } from '@/utils/ui';
	import BaseBreadcrumbs from '@/components/base-breadcrumbs';
	import BaseButton from '@/components/base-button';
	import BaseAwardVertical from '@/components/base-award-vertical';
	import ComercialPopup from '@/components/comercial-popup';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const backgroundImage = computed(() => {
		return props.data.background;
	});

	const backgroundImageSmall = computed(() => {
		return props.data.background_small;
	});

	const breadcrumbs = computed(() => {
		return props.data.breadcrumbs;
	});

	const title = computed(() => {
		return props.data.title;
	});

	const text = computed(() => {
		return props.data.description;
	});

	const priceData = computed(() => {
		const price = props.data.price;

		if (!price) return false;

		return {
			title: props.data.price_caption,
			price,
		};
	});

	const showSaleIcon = computed(() => {
		return props.data.show_sale_icon;
	});

	const awards = computed(() => {
		// У блока awards по id 'lists/result' в апи подруземевается
		// контент для блока kpi (Смотри ниже свойство kpi)
		const isAwards = props.data.awards?.id === 'lists/award';
		return isAwards
			? (props.data.awards.items as BaseAwardsType['items'])
			: null;
	});

	const results = computed(() => {
		// У блока awards по id 'lists/award' в апи подруземевается
		// контент для блока awards (Смотри выше свойство awards)
		const isKpi = props.data.awards?.id === 'lists/result';
		return isKpi
			? (props.data.awards.items as BaseResultsType['items'])
			: null;
	});

	const btnName = computed(() => {
		return props.data.order_button?.name || 'Оставить заявку';
	});

	const scrollToForm = computed(() => {
		return props.data.order_button?.scroll_to_form || false;
	});

	const discount = computed(() => {
		const hasDiscount = props.data.order_button?.action?.name;
		return hasDiscount ? props.data.order_button!.action : null;
	});

	const isShowPopup = ref(false);

	const onShowPopup = () => {
		isShowPopup.value = true;
	};

	const onClosePopup = () => {
		isShowPopup.value = false;
	};

	const onScrollToForm = () => {
		scrollTo({
			to: '.js-the-footer-form__scroll-pos',
		});
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
