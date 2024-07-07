<template>
	<section
		v-if="items"
		class="base-cases-slider"
		:class="{ 'has-mb': items.length > 1 }"
	>
		<BaseBlockTitle>
			<h2>{{ title }}</h2>
		</BaseBlockTitle>
		<div class="slider">
			<div class="slider-inner">
				<div class="slider-inner-content">
					<BaseSwiper :options="swiperOptions">
						<BaseSwiperSlide
							v-for="(item, index) in items"
							:key="index"
						>
							<BaseCaseInfo :data="item" />
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

			<BaseSliderPagination ref="paginationEl" />
		</div>
	</section>
</template>

<script setup lang="ts">
	import type { PropType, UnwrapNestedRefs } from 'vue';
	import { ref, computed, onMounted } from 'vue';
	import type { BaseType } from './type';
	import { useMediaQuery } from '@/composables/use-media-query';
	import BaseBlockTitle from '@/components/base-block-title';
	import type { OptionsType as BaseSwiperOptionsType } from '@/components/base-swiper/type';
	import BaseSwiper from '@/components/base-swiper';
	import BaseSwiperSlide from '@/components/base-swiper/base-swiper-slide';
	import BaseCaseInfo from '@/components/base-case-info';
	import type { BaseSliderArrowButtonType } from '@/components/base-slider-arrow-button/type';
	import type { BaseSliderPaginationType } from '@/components/base-slider-pagination/type';
	import BaseSliderArrowButton from '@/components/base-slider-arrow-button';
	import BaseSliderPagination from '@/components/base-slider-pagination';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const autoHeight = ref(false);
	const prevButtonEl = ref<UnwrapNestedRefs<BaseSliderArrowButtonType>>();
	const nextButtonEl = ref<UnwrapNestedRefs<BaseSliderArrowButtonType>>();
	const paginationEl = ref<UnwrapNestedRefs<BaseSliderPaginationType>>();

	const swiperOptions = computed<BaseSwiperOptionsType>(() => {
		return {
			slidesPerView: 'auto',
			autoHeight: autoHeight.value,
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

	const title = computed(() => {
		return props.data.name;
	});

	const items = computed(() => {
		const items = props.data.items;
		const hasItems = items && items.length > 0;

		return hasItems ? items : null;
	});

	const mediaQuery = useMediaQuery();

	onMounted(() => {
		mediaQuery('(max-width: 767px)', (matches) => {
			autoHeight.value = matches;
		});
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
