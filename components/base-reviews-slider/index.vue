<template>
	<section
		class="base-reviews-slider"
		:class="{ 'has-mb': totalCountSlides > 1 }"
	>
		<div class="container">
			<div class="head">
				<h2 class="title">{{ title }}</h2>
				<div
					v-if="totalCountSlides > 1"
					class="slider-counter"
				>
					<BaseCounterSlides
						:active-slide-index="activeSlideIndex"
						:total-count-slides="totalCountSlides"
						:modifier-classes="['dark', 'big']"
					/>
				</div>
			</div>

			<div class="slider">
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

					<BaseSliderArrowButton
						ref="prevButtonEl"
						:modifier-classes="['small', 'theme-second']"
						:is-prev="true"
					/>
					<BaseSliderArrowButton
						ref="nextButtonEl"
						:modifier-classes="['small', 'theme-second']"
						:is-next="true"
					/>
				</div>

				<BaseSliderPagination ref="paginationEl" />
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import type { PropType, UnwrapNestedRefs } from 'vue';
	import { ref, computed } from 'vue';
	import type { BaseReviewsSliderType } from './type';
	import type {
		BaseType as BaseSwiperType,
		OptionsType as BaseSwiperOptionsType,
	} from '@/components/base-swiper/type';
	import BaseCounterSlides from '@/components/base-counter-slides';
	import BaseSwiper from '@/components/base-swiper';
	import BaseSwiperSlide from '@/components/base-swiper/base-swiper-slide';
	import BaseReview from '@/components/base-review';
	import type { BaseSliderArrowButtonType } from '@/components/base-slider-arrow-button/type';
	import type { BaseSliderPaginationType } from '@/components/base-slider-pagination/type';
	import BaseSliderArrowButton from '@/components/base-slider-arrow-button';
	import BaseSliderPagination from '@/components/base-slider-pagination';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseReviewsSliderType>,
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

	const prevButtonEl = ref<UnwrapNestedRefs<BaseSliderArrowButtonType>>();
	const nextButtonEl = ref<UnwrapNestedRefs<BaseSliderArrowButtonType>>();
	const paginationEl = ref<UnwrapNestedRefs<BaseSliderPaginationType>>();

	const swiperOptions = computed<BaseSwiperOptionsType>(() => {
		return {
			autoHeight: true,
			slidesPerView: 'auto',
			mousewheel: {
				forceToAxis: true,
			},
			navigation: {
				prevEl: prevButtonEl.value?.element,
				nextEl: nextButtonEl.value?.element,
			},
			pagination: {
				el: paginationEl.value?.element,
				clickable: true,
				dynamicBullets: true,
				dynamicMainBullets: 1,
			},
		};
	});

	const onSwiper = (instance: BaseSwiperType) => {
		instance.on('slideChange', function (this: BaseSwiperType) {
			activeSlideIndex.value = this.activeIndex + 1;
		});
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
