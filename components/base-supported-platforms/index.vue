<template>
	<section class="base-supported-platforms">
		<div class="inner">
			<div class="container">
				<h2 class="title">{{ title }}</h2>
				<div
					ref="sliderEl"
					class="slider"
				>
					<BaseSwiper :options="swiperOptions">
						<BaseSwiperSlide
							v-for="(item, index) in items"
							:key="index"
						>
							<div
								class="pic"
								:style="`
								--img-width: ${item.picture_params.width};
								--img-height: ${item.picture_params.height};
							`"
							>
								<img
									v-lazy
									:data-src="item.picture"
									alt="platform"
								/>
							</div>
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
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import type { PropType, UnwrapNestedRefs } from 'vue';
	import { ref, computed, onMounted } from 'vue';
	import type { BaseType } from './type';
	import type { OptionsType as BaseSwiperOptionsType } from '@/components/base-swiper/type';
	import { useMediaQuery } from '@/composables/use-media-query';
	import BaseSwiper from '@/components/base-swiper';
	import BaseSwiperSlide from '@/components/base-swiper/base-swiper-slide';
	import type { BaseSliderArrowButtonType } from '@/components/base-slider-arrow-button/type';
	import BaseSliderArrowButton from '@/components/base-slider-arrow-button';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const title = computed(() => {
		return props.data.title;
	});

	const items = computed(() => {
		return props.data.items;
	});

	const prevButtonEl = ref<UnwrapNestedRefs<BaseSliderArrowButtonType>>();
	const nextButtonEl = ref<UnwrapNestedRefs<BaseSliderArrowButtonType>>();

	const rowCount = ref(1);
	const spaceBetween = ref(158);

	const swiperOptions = computed<BaseSwiperOptionsType>(() => {
		return {
			slidesPerView: 'auto',
			spaceBetween: spaceBetween.value,
			grid: {
				fill: 'row',
				rows: rowCount.value,
			},
			mousewheel: {
				forceToAxis: true,
			},
			navigation: {
				prevEl: prevButtonEl.value?.element,
				nextEl: nextButtonEl.value?.element,
			},
		};
	});

	const sliderEl = ref<HTMLElement>();

	const mediaQuery = useMediaQuery();

	onMounted(() => {
		const platfrom = sliderEl.value;

		if (platfrom) {
			const slides = platfrom.querySelectorAll('.swiper-slide');
			const lengthOfSlides = slides.length;

			if (lengthOfSlides > 0) {
				const centralIndexOfSlide = Math.ceil(lengthOfSlides / 2);

				const centralSlide = slides[centralIndexOfSlide - 1];

				centralSlide.classList.add('central-slide');
			}
		}

		// с breakpoints слайдера почему то работает не коректно при ресайзе поэтому используем такой подход
		mediaQuery('(max-width: 1279px)', (matches) => {
			rowCount.value = matches ? 2 : 1;
		});

		mediaQuery('(max-width: 767px)', (matches) => {
			spaceBetween.value = matches ? 40 : 158;
		});
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
