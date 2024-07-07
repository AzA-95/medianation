<template>
	<div
		class="base-counter-slides"
		:class="[modifierClasses]"
	>
		<span class="active">{{ activeSlideIndex }}</span>
		<span class="dash"></span>
		<span class="total">{{ totalCount }}</span>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';

	const props = defineProps({
		activeSlideIndex: {
			type: Number,
			required: true,
		},
		totalCountSlides: {
			type: Number,
			required: true,
		},
		modifierClasses: {
			type: Array as PropType<('dark' | 'big')[] | null>,
			default: null,
		},
	});

	const activeSlideIndex = computed(() => {
		const slideIndex = props.activeSlideIndex;
		return slideIndex > 9 ? slideIndex : `0${slideIndex}`;
	});

	const totalCount = computed(() => {
		const count = props.totalCountSlides;
		return count > 9 ? count : `0${count}`;
	});

	const modifierClasses = computed(() => {
		return props.modifierClasses?.map((item) => {
			return `base-counter-slides_${item}`;
		});
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
