<template>
	<div
		ref="scrollEl"
		class="base-slider-scrollbar"
	></div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import type { BaseSliderScrollbarType } from './type';

	const scrollEl = ref<HTMLElement>();

	defineExpose<BaseSliderScrollbarType>({
		element: scrollEl,
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
