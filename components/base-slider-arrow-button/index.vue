<template>
	<div
		ref="buttonEl"
		class="base-slider-arrow-button"
		:class="[
			isPrev
				? 'base-slider-arrow-button_prev swiper-button-prev'
				: 'base-slider-arrow-button_next swiper-button-next',
			modifierClasses,
		]"
	></div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { ref, computed } from 'vue';
	import type { BaseSliderArrowButtonType } from './type';

	const props = defineProps({
		isPrev: {
			type: Boolean,
			default: false,
		},
		isNext: {
			type: Boolean,
			default: false,
		},
		modifierClasses: {
			type: Array as PropType<('small' | 'theme-second')[] | null>,
			default: null,
		},
	});

	const modifierClasses = computed(() => {
		return props.modifierClasses?.map((item) => {
			return `base-slider-arrow-button_${item}`;
		});
	});

	const isPrev = computed(() => {
		return props.isPrev;
	});

	const buttonEl = ref<HTMLElement>();

	defineExpose<BaseSliderArrowButtonType>({
		element: buttonEl,
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
