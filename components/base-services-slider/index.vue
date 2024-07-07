<template>
	<div
		class="base-services-slider"
		:class="{ 'has-slider-controls': totalCountSlides > 1 }"
	>
		<div
			v-if="totalCountSlides > 1"
			class="slider-controls"
		>
			<div class="container">
				<div class="slider-controls__row">
					<div class="slider-controls__control">
						<BaseCounterSlides
							:active-slide-index="activeSlideIndex"
							:total-count-slides="totalCountSlides"
						/>
					</div>
					<div class="slider-controls__control">
						<BaseSliderArrows
							@prev="onSlideToPrev"
							@next="onSlideToNext"
						/>
					</div>
				</div>
			</div>
		</div>
		<div class="slider">
			<BaseSwiper
				:options="swiperOptions"
				@swiper="onSwiper"
			>
				<BaseSwiperSlide
					v-for="item in items"
					:key="item.id"
				>
					<section class="service-banner">
						<div class="container">
							<div
								class="service-banner__pic"
								:style="{
									'--small-picture-width':
										item.small_picture_params.width,
									'--small-picture-height':
										item.small_picture_params.height,
								}"
							>
								<picture>
									<source
										media="(max-width: 767px)"
										:data-srcset="item.small_picture"
									/>
									<img
										v-lazy
										:data-src="item.picture"
										alt="pic"
									/>
								</picture>
							</div>
							<h2 class="service-banner__title">
								{{ item.name }}
							</h2>
							<div
								class="service-banner__desc"
								v-html="item.text"
							></div>
							<div class="service-banner__bottom">
								<div
									v-if="item.price_text"
									class="service-banner__price"
								>
									{{ item.price_text }}
								</div>
								<div class="service-banner__btns">
									<div class="service-banner__btn">
										<BaseButton @click="onOpenPopup">
											{{ item.button_name }}
										</BaseButton>
									</div>
									<div
										v-if="item.additional_button_link"
										class="service-banner__btn"
									>
										<BaseButton
											:link="{
												to: item.additional_button_link,
											}"
											theme="fourth"
										>
											{{ item.additional_button_name }}
										</BaseButton>
									</div>
								</div>
							</div>
						</div>
					</section>
				</BaseSwiperSlide>
			</BaseSwiper>
		</div>

		<ComercialPopup
			:show="isShowPopup"
			@close="onClosePopup"
		/>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { ref, computed } from 'vue';
	import type { BaseServicesSliderType } from './type';
	import type {
		BaseType as BaseSwiperType,
		OptionsType as BaseSwiperOptionsType,
	} from '@/components/base-swiper/type';
	import BaseSwiper from '@/components/base-swiper';
	import BaseSwiperSlide from '@/components/base-swiper/base-swiper-slide';
	import BaseCounterSlides from '@/components/base-counter-slides';
	import BaseSliderArrows from '@/components/base-slider-arrows';
	import BaseButton from '@/components/base-button';
	import ComercialPopup from '@/components/comercial-popup';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseServicesSliderType>,
			required: true,
		},
	});

	const activeSlideIndex = ref(1);

	const totalCountSlides = computed(() => {
		return props.data.items.length;
	});

	const items = computed(() => {
		return props.data.items;
	});

	const isShowPopup = ref(false);

	const onOpenPopup = () => {
		isShowPopup.value = true;
	};

	const onClosePopup = () => {
		isShowPopup.value = false;
	};

	const swiperOptions: BaseSwiperOptionsType = {
		effect: 'fade',
		fadeEffect: {
			crossFade: true,
		},
		autoHeight: true,
		slidesPerView: 'auto',
		mousewheel: {
			forceToAxis: true,
			thresholdDelta: 20,
		},
	};

	const swiperInstance = ref<BaseSwiperType>();

	const onSlideToPrev = () => {
		swiperInstance.value?.slidePrev();
	};

	const onSlideToNext = () => {
		swiperInstance.value?.slideNext();
	};

	const onSwiper = (instance: BaseSwiperType) => {
		swiperInstance.value = instance;

		instance.on('slideChange', function (this: BaseSwiperType) {
			activeSlideIndex.value = this.activeIndex + 1;
		});
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
