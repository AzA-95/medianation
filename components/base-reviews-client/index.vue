<template>
	<section
		id="base-reviews-client"
		class="base-reviews-client"
		:class="{ 'has-slider-controls': totalCountSlides > 1 }"
	>
		<div class="container">
			<div class="head">
				<h2 class="title">{{ title }}</h2>
				<div
					v-if="totalCountSlides > 1"
					class="slider-controls"
				>
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

			<div class="clients">
				<BaseSwiper
					:options="swiperOptionsThumbs"
					@swiper="onSwiperThumbs"
				>
					<BaseSwiperSlide
						v-for="(item, index) in items"
						:key="index"
						:class="{
							'custom-active': activeSlideIndex === index + 1,
						}"
					>
						<div
							class="client"
							@click="onSlideTo(index)"
						>
							<img
								v-lazy
								:data-src="
									item.client.picture_white
										? item.client.picture_white
										: item.client.picture
								"
								alt="client"
							/>
						</div>
					</BaseSwiperSlide>
				</BaseSwiper>
			</div>

			<div class="reviews">
				<BaseSwiper
					:options="swiperOptions"
					@swiper="onSwiper"
				>
					<BaseSwiperSlide
						v-for="(item, index) in items"
						:key="index"
					>
						<BaseReview :data="item" />
					</BaseSwiperSlide>
				</BaseSwiper>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { ref, computed } from 'vue';
	import type { BaseReviewsClientType } from './type';
	import type {
		BaseType as BaseSwiperType,
		OptionsType as BaseSwiperOptionsType,
	} from '@/components/base-swiper/type';
	import BaseCounterSlides from '@/components/base-counter-slides';
	import BaseSliderArrows from '@/components/base-slider-arrows';
	import BaseSwiper from '@/components/base-swiper';
	import BaseSwiperSlide from '@/components/base-swiper/base-swiper-slide';
	import BaseReview from '@/components/base-review';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseReviewsClientType>,
			required: true,
		},
	});

	const activeSlideIndex = ref(1);

	const totalCountSlides = computed(() => {
		return props.data.items?.length;
	});

	const title = computed(() => {
		return props.data.name;
	});

	const items = computed(() => {
		return props.data.items;
	});

	const swiperInstance = ref<BaseSwiperType>();
	const swiperInstanceThumbs = ref<BaseSwiperType>();

	const swiperOptions: BaseSwiperOptionsType = {
		autoHeight: true,
		slidesPerView: 'auto',
	};

	const swiperOptionsThumbs: BaseSwiperOptionsType = {
		spaceBetween: 40,
		slidesPerView: 'auto',
		centeredSlides: true,
		centeredSlidesBounds: true,
		normalizeSlideIndex: false,
		on: {
			afterInit(this: BaseSwiperType) {
				// костыль чтобы в мобилке позиция первого логотипа была коректная
				// так как есть косяк с позиционирование с centeredSlides и centeredSlidesBounds
				setTimeout(() => {
					this.setTranslate(0);
				}, 1000); // без большой задержки не сбивается транслэйт слайдера
			},
		},
	};

	const onSwiper = (instance: BaseSwiperType) => {
		swiperInstance.value = instance;

		instance.on('slideChange', function (this: BaseSwiperType) {
			activeSlideIndex.value = this.activeIndex + 1;

			if (swiperInstanceThumbs.value) {
				// Сделал без thumbs
				// так как не центрируется логотип по центру с использование thumbs
				swiperInstanceThumbs.value.slideTo(this.activeIndex);
			}
		});
	};

	const onSwiperThumbs = (instance: BaseSwiperType) => {
		swiperInstanceThumbs.value = instance;
	};

	const onSlideTo = (index: number) => {
		swiperInstance.value?.slideTo(index);
	};

	const onSlideToPrev = () => {
		swiperInstance.value?.slidePrev();
	};

	const onSlideToNext = () => {
		swiperInstance.value?.slideNext();
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
