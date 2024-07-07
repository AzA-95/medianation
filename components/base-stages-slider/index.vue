<template>
	<div
		v-if="items"
		class="base-stages-slider"
	>
		<div class="container">
			<h2 class="title">{{ title }}</h2>
			<div class="slider">
				<BaseSwiper :options="swiperOptions">
					<BaseSwiperSlide
						v-for="(item, index) in items"
						:key="index"
					>
						<div class="stage">
							<div class="stage__text">
								{{ item.text }}
							</div>
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
</template>

<script setup lang="ts">
	import type { PropType, UnwrapNestedRefs } from 'vue';
	import { ref, computed } from 'vue';
	import type { BaseStagesSliderType } from './type';
	import type { OptionsType as BaseSwiperOptionsType } from '@/components/base-swiper/type';
	import BaseSwiper from '@/components/base-swiper';
	import BaseSwiperSlide from '@/components/base-swiper/base-swiper-slide';
	import type { BaseSliderArrowButtonType } from '@/components/base-slider-arrow-button/type';
	import BaseSliderArrowButton from '@/components/base-slider-arrow-button';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseStagesSliderType>,
			required: true,
		},
	});

	const title = computed(() => {
		return props.data.title;
	});

	const items = computed(() => {
		const items = props.data.items;
		const hasItems = items && items.length;

		return hasItems ? items : null;
	});

	const prevButtonEl = ref<UnwrapNestedRefs<BaseSliderArrowButtonType>>();
	const nextButtonEl = ref<UnwrapNestedRefs<BaseSliderArrowButtonType>>();

	const swiperOptions = computed<BaseSwiperOptionsType>(() => {
		return {
			slidesPerView: 'auto',
			mousewheel: {
				forceToAxis: true,
			},
			navigation: {
				prevEl: prevButtonEl.value?.element,
				nextEl: nextButtonEl.value?.element,
			},
		};
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
