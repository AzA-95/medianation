<template>
	<div
		class="base-play-icon"
		:class="[modifierClasses]"
	>
		<span
			v-if="time"
			class="time"
		>
			{{ time }}
		</span>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';

	const props = defineProps({
		time: {
			type: String as PropType<string | null>,
			default: null,
		},
		modifierClasses: {
			type: Array as PropType<'without-hover'[] | null>,
			default: null,
		},
	});

	const time = computed(() => {
		return props.time;
	});

	const modifierClasses = computed(() => {
		return props.modifierClasses?.map((item) => {
			return `base-play-icon_${item}`;
		});
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
