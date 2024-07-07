<template>
	<section
		class="base-case-banners"
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
							:modifier-classes="['dark']"
							:active-slide-index="activeSlideIndex"
							:total-count-slides="totalCountSlides"
						/>
					</div>
					<div class="slider-controls__control">
						<BaseSliderArrows
							:modifier-classes="['grey']"
							@prev="onSlideToPrev"
							@next="onSlideToNext"
						/>
					</div>
				</div>
			</div>
			<div class="slider">
				<BaseSwiper
					:options="swiperOptions"
					@swiper="onSwiper"
				>
					<BaseSwiperSlide
						v-for="(item, index) in cases"
						:key="index"
					>
						<div class="case-banner">
							<div class="case-banner__pic">
								<a
									:href="item.link"
									target="_blank"
								>
									<img
										v-lazy
										:data-src="item.pic"
										alt="pic"
									/>
								</a>
							</div>
							<div class="case-banner__name">
								<a
									:href="item.link"
									target="_blank"
								>
									{{ item.name }}
								</a>
							</div>
						</div>
					</BaseSwiperSlide>
				</BaseSwiper>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { ref, computed } from 'vue';
	import type { BaseType } from './type';
	import type {
		BaseType as BaseSwiperType,
		OptionsType as BaseSwiperOptionsType,
	} from '@/components/base-swiper/type';
	import BaseCounterSlides from '@/components/base-counter-slides';
	import BaseSliderArrows from '@/components/base-slider-arrows';
	import BaseSwiper from '@/components/base-swiper';
	import BaseSwiperSlide from '@/components/base-swiper/base-swiper-slide';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const activeSlideIndex = ref(1);

	const totalCountSlides = computed(() => {
		return props.data.items?.length;
	});

	const title = computed(() => {
		return props.data.title;
	});

	const cases = computed(() => {
		return props.data.items;
	});

	const swiperInstance = ref<BaseSwiperType>();

	const swiperOptions: BaseSwiperOptionsType = {
		slidesPerView: 'auto',
		mousewheel: {
			forceToAxis: true,
		},
	};

	const onSwiper = (instance: BaseSwiperType) => {
		swiperInstance.value = instance;

		// Используем snapIndexChange так как slideChange
		// не определяет последний слайд(В десктопе)
		instance.on('snapIndexChange', () => {
			activeSlideIndex.value = instance.snapIndex + 1;
		});
	};

	const onSlideToPrev = () => {
		swiperInstance.value?.slidePrev();
	};

	const onSlideToNext = () => {
		swiperInstance.value?.slideNext();
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
