<template>
	<section class="base-clients-slider">
		<div class="container">
			<h2 class="title">{{ title }}</h2>
			<div
				ref="sliderEl"
				class="slider"
			>
				<BaseSwiper
					:options="swiperOptions"
					@swiper="onSwiper"
				>
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
								alt="logo"
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
	</section>
</template>

<script setup lang="ts">
	import { ref, computed, shallowRef, nextTick } from 'vue';
	import type { PropType, UnwrapNestedRefs } from 'vue';
	import type { BaseType } from './type';
	import type {
		BaseType as BaseSwiperType,
		OptionsType as BaseSwiperOptionsType,
	} from '@/components/base-swiper/type';
	import type { BaseSliderArrowButtonType } from '@/components/base-slider-arrow-button/type';
	import { useApiOnInteraction } from '@/composables/use-api-on-interaction';
	import BaseSwiper from '@/components/base-swiper';
	import BaseSwiperSlide from '@/components/base-swiper/base-swiper-slide';
	import BaseSliderArrowButton from '@/components/base-slider-arrow-button';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const title = computed(() => {
		return props.data.name;
	});

	const nav = shallowRef(props.data.nav);
	const items = shallowRef(props.data.items);

	const prevButtonEl = ref<UnwrapNestedRefs<BaseSliderArrowButtonType>>();
	const nextButtonEl = ref<UnwrapNestedRefs<BaseSliderArrowButtonType>>();

	const swiperOptions = computed<BaseSwiperOptionsType>(() => {
		return {
			slidesPerView: 'auto',
			freeMode: {
				enabled: true,
				momentumRatio: 1.3,
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

	const loadMore = () => {
		const apiPath = nav.value!.next_page_url!.replace('/api/v1/', '');

		return useApiOnInteraction<Pick<BaseType, 'nav' | 'items'>>(
			apiPath,
		).then((data) => {
			nav.value = data.nav;
			items.value = [...items.value, ...data.items];
		});
	};

	const initLoadMore = (instance: BaseSwiperType) => {
		if (sliderEl.value) {
			const getSlidesWidth = () => {
				const slides = Array.from(
					sliderEl.value!.querySelectorAll(
						'.swiper-slide',
					) as NodeListOf<HTMLElement>,
				);

				return slides
					.map((slide) => {
						return slide.offsetWidth;
					})
					.reduce((prev, next) => prev + next);
			};

			let isExecuted = false;
			let ceilSlideWidth = getSlidesWidth() / 2;

			instance.on('setTranslate', (_, translate) => {
				if (
					Math.abs(translate) > ceilSlideWidth &&
					isExecuted === false &&
					nav.value?.next_page_url
				) {
					isExecuted = true;

					loadMore().finally(() => {
						nextTick(() => {
							isExecuted = false;
							ceilSlideWidth = getSlidesWidth() / 2;
							instance.update();
						});
					});
				}
			});
		}
	};

	const onSwiper = (instance: BaseSwiperType) => {
		initLoadMore(instance);
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
