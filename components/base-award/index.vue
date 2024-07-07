<template>
	<div
		class="base-award"
		:class="[modifierClasses]"
	>
		<div
			class="photo"
			:class="{ lazy: useLazyImage }"
		>
			<img
				v-if="useLazyImage"
				v-lazy
				:data-src="picture"
				alt="icon"
			/>
			<img
				v-else
				:src="picture"
				alt="icon"
			/>
		</div>
		<div class="content">
			<div class="name">{{ name }}</div>
			<div class="text">{{ text }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';
	import type { BaseType } from './type';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
		useLazyImage: {
			type: Boolean,
			default: true,
		},
		modifierClasses: {
			type: Array as PropType<
				| ('light' | 'fs-small' | 'vertical-in-md-max' | 'bigger')[]
				| null
			>,
			default: null,
		},
	});

	const modifierClasses = computed(() => {
		return props.modifierClasses?.map((item) => {
			return `base-award_${item}`;
		});
	});

	const picture = computed(() => {
		return props.data.picture;
	});

	const name = computed(() => {
		return props.data.name;
	});

	const text = computed(() => {
		return props.data.text;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
