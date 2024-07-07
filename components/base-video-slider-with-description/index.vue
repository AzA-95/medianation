<template>
	<section
		v-if="items"
		class="base-video-slider-with-description"
		:class="[modifierClasses]"
	>
		<div class="container">
			<div class="head">
				<h3 class="title">{{ title }}</h3>
				<div
					v-if="totalCountSlides > 1"
					class="slider-controls slider-controls_hide-mob"
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
			<div class="row">
				<div class="desc">
					<div class="pic">
						<img
							v-lazy
							:data-src="picture"
							alt="pic"
						/>
					</div>
					<div
						class="text"
						v-html="description"
					></div>
				</div>
				<div class="slider">
					<BaseSwiper
						:options="swiperOptions"
						@swiper="onSwiper"
					>
						<BaseSwiperSlide
							v-for="(item, index) in items"
							:key="index"
						>
							<div class="video">
								<div class="video__el">
									<BaseVideo
										:picture="item.picture"
										:items="videoLinks"
										:start-index="index"
									/>
								</div>
								<div class="video__row">
									<div
										class="video__text"
										v-html="item.html || item.name"
									></div>
									<a
										:href="item.video.ext_link"
										target="_blank"
										class="video__link"
									>
										YouTube
									</a>
								</div>
							</div>
						</BaseSwiperSlide>
					</BaseSwiper>
				</div>
			</div>
			<div
				v-if="totalCountSlides > 1"
				class="slider-controls slider-controls_hide-desk"
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
	import BaseVideo from '@/components/base-video';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
		modifierClasses: {
			type: Array as PropType<('second-bg' | 'third-bg')[] | null>,
			default: null,
		},
	});

	const activeSlideIndex = ref(1);

	const modifierClasses = computed(() => {
		return props.modifierClasses?.map((item) => {
			return `base-video-slider-with-description_${item}`;
		});
	});

	const items = computed(() => {
		return props.data.elements;
	});

	const totalCountSlides = computed(() => {
		return items.value.length || 0;
	});

	const title = computed(() => {
		return props.data.name;
	});

	const picture = computed(() => {
		return props.data.picture;
	});

	const description = computed(() => {
		return props.data.html;
	});

	const videoLinks = computed(() => {
		return items.value.map((item) => {
			return {
				src: item.video.link,
			};
		});
	});

	const swiperOptions: BaseSwiperOptionsType = {
		slidesPerView: 'auto',
		spaceBetween: 0,
	};

	const swiperInstance = ref<BaseSwiperType>();

	const onSwiper = (instance: BaseSwiperType) => {
		swiperInstance.value = instance;

		instance.on('slideChange', function (this: BaseSwiperType) {
			activeSlideIndex.value = this.activeIndex + 1;
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
