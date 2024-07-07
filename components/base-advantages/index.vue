<template>
	<section class="base-advantages">
		<div class="container">
			<h2 class="title">{{ title }}</h2>
			<div class="slider">
				<div class="advantages">
					<BaseSwiper :options="swiperOptions">
						<BaseSwiperSlide
							v-for="(item, index) in items"
							:key="index"
						>
							<div class="advantage">
								<div class="pic">
									<img
										v-lazy
										:data-src="item.icon"
										alt="icon"
									/>
								</div>
								<div class="text">{{ item.text }}</div>
							</div>
						</BaseSwiperSlide>
					</BaseSwiper>
				</div>

				<BaseSliderPagination
					v-show="sliderInited"
					ref="paginationEl"
				/>
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
	import type { BaseSliderPaginationType } from '@/components/base-slider-pagination/type';
	import BaseSliderPagination from '@/components/base-slider-pagination';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const title = computed(() => {
		return props.data.name;
	});

	const items = computed(() => {
		return props.data.items;
	});

	const sliderInited = ref(false);
	const paginationEl = ref<UnwrapNestedRefs<BaseSliderPaginationType>>();

	const swiperOptions = computed<BaseSwiperOptionsType>(() => {
		return {
			init: sliderInited.value,
			slidesPerView: 'auto',
			pagination: {
				el: paginationEl.value?.element,
				clickable: true,
				dynamicBullets: true,
				dynamicMainBullets: 1,
			},
		};
	});

	const mediaQuery = useMediaQuery();

	onMounted(() => {
		mediaQuery('(max-width: 1279px)', (matches) => {
			sliderInited.value = matches;
		});
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
