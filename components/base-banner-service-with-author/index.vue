<template>
	<section class="base-banner-service-with-author">
		<div class="container">
			<div class="breadcrumbs">
				<BaseBreadcrumbs
					:breadcrumbs="breadcrumbs"
					:modifier-classes="['white']"
				/>
			</div>

			<div class="cols">
				<div class="col-left">
					<div class="author">
						<div class="author__pic">
							<img
								:src="author.picture"
								:width="author.picture_params.width"
								:height="author.picture_params.height"
								alt="pic"
							/>
						</div>
						<div class="author__bottom">
							<div class="author__name">{{ author.name }}</div>
							<div class="author__profession">
								{{ author.profession }}
							</div>
						</div>
					</div>
				</div>

				<div class="col-right">
					<div class="head">
						<div class="title">
							<h1>{{ title }}</h1>
						</div>
						<div class="author-small">
							<div class="author-small__pic">
								<img
									:src="author.picture_small"
									alt="author"
								/>
							</div>
							<div class="author-small__desc">
								<div class="author-small__name">
									{{ author.name }}
								</div>
								<div class="author-small__profession">
									{{ author.profession }}
								</div>
							</div>
						</div>
					</div>

					<div class="awards-wrap">
						<div class="awards">
							<BaseSwiper :options="swiperOptions">
								<BaseSwiperSlide
									v-for="(award, index) in awards"
									:key="index"
								>
									<div class="award">
										<BaseAward
											:data="award"
											:use-lazy-image="false"
											:modifier-classes="[
												'light',
												'fs-small',
												'vertical-in-md-max',
											]"
										/>
									</div>
								</BaseSwiperSlide>
							</BaseSwiper>
						</div>
					</div>

					<div
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
							<div class="price__bottom">
								<div class="price__value">
									{{ priceData.price }}
								</div>
								<div class="price__text">
									Указана стоимость рекламного бюджета
								</div>
							</div>
						</div>

						<div class="btn-cols">
							<div class="btn">
								<BaseButton @click="onShowPopup">
									{{ btnName }}
								</BaseButton>
							</div>

							<div
								v-if="discount"
								class="discount"
							>
								<div
									v-if="!discount.value"
									class="discount-icon"
								></div>
								<div
									v-else
									class="discount-precentage"
								>
									{{ discount.value }}
								</div>

								<div class="discount-text">
									{{ discount.name }}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="circle-icon">
					<BaseCircleRotatedIcon />
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
	import type { BaseType } from './type';
	import BaseBreadcrumbs from '@/components/base-breadcrumbs';
	import type { OptionsType as BaseSwiperOptionsType } from '@/components/base-swiper/type';
	import BaseSwiper from '@/components/base-swiper';
	import BaseSwiperSlide from '@/components/base-swiper/base-swiper-slide';
	import BaseAward from '@/components/base-award';
	import BaseButton from '@/components/base-button';
	import BaseCircleRotatedIcon from '@/components/base-circle-rotated-icon';
	import ComercialPopup from '@/components/comercial-popup';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const breadcrumbs = computed(() => {
		return props.data.breadcrumbs;
	});

	const author = computed(() => {
		return props.data.author;
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

	const awards = computed(() => {
		return props.data.awards?.items;
	});

	const btnName = computed(() => {
		return props.data.order_button?.name || 'Оставить заявку';
	});

	const discount = computed(() => {
		const hasDiscount = props.data.order_button?.action?.name;

		return hasDiscount ? props.data.order_button!.action : null;
	});

	const swiperOptions: BaseSwiperOptionsType = {
		slidesPerView: 'auto',
		mousewheel: {
			forceToAxis: true,
		},
	};

	const isShowPopup = ref(false);

	const onShowPopup = () => {
		isShowPopup.value = true;
	};

	const onClosePopup = () => {
		isShowPopup.value = false;
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
