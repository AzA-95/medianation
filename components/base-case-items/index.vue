<template>
	<div class="base-case-items">
		<div class="slider">
			<BaseSwiper :options="swiperOptions">
				<BaseSwiperSlide
					v-for="(item, index) in items"
					:key="index"
				>
					<BaseCaseInfo
						:data="item"
						:modifier-classes="['has-line']"
					/>
				</BaseSwiperSlide>
			</BaseSwiper>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { ref, computed, onMounted } from 'vue';
	import type { BaseType } from './type';
	import { useMediaQuery } from '@/composables/use-media-query';
	import type { OptionsType as BaseSwiperOptionsType } from '@/components/base-swiper/type';
	import BaseSwiper from '@/components/base-swiper';
	import BaseSwiperSlide from '@/components/base-swiper/base-swiper-slide';
	import BaseCaseInfo from '@/components/base-case-info';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const init = ref(false);

	const swiperOptions = computed<BaseSwiperOptionsType>(() => {
		return {
			init: init.value,
			slidesPerView: 'auto',
			mousewheel: {
				forceToAxis: true,
			},
		};
	});

	const items = computed(() => {
		return props.data.items;
	});

	const mediaQuery = useMediaQuery();

	onMounted(() => {
		mediaQuery('(max-width: 767px)', (matches) => {
			init.value = matches;
		});
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
