<template>
	<div
		class="base-slider-arrows"
		:class="[modifierClasses]"
	>
		<div
			class="arrow-wrap"
			@click="onSlideToPrev"
		>
			<div class="arrow arrow_left"></div>
		</div>
		<div
			class="arrow-wrap"
			@click="onSlideToNext"
		>
			<div class="arrow arrow_right"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';

	const emits = defineEmits<{
		(e: 'prev'): void;
		(e: 'next'): void;
	}>();

	const props = defineProps({
		modifierClasses: {
			type: Array as PropType<('grey' | 'small')[] | null>,
			default: null,
		},
	});

	const modifierClasses = computed(() => {
		return props.modifierClasses?.map((item) => {
			return `base-slider-arrows_${item}`;
		});
	});

	const onSlideToPrev = () => {
		emits('prev');
	};

	const onSlideToNext = () => {
		emits('next');
	};
</script>

<style lang="scss" scoped src="./style.scss"></style>
