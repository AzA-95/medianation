<template>
	<div
		ref="buttonEl"
		class="swiper-pagination"
	></div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import type { BaseSliderPaginationType } from './type';

	const buttonEl = ref<HTMLElement>();

	defineExpose<BaseSliderPaginationType>({
		element: buttonEl,
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
