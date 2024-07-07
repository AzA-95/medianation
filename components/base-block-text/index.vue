<template>
	<section
		class="base-block-text"
		:class="[modifierClasses]"
	>
		<div class="container">
			<div class="content">
				<h2 class="title">{{ title }}</h2>
				<div
					class="desc"
					v-html="text"
				></div>
			</div>
		</div>
	</section>
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
		modifierClasses: {
			type: Array as PropType<('dark' | 'short')[] | null>,
			default: null,
		},
	});

	const modifierClasses = computed(() => {
		return props.modifierClasses?.map((item) => {
			return `base-block-text_${item}`;
		});
	});

	const title = computed(() => {
		return props.data.title;
	});

	const text = computed(() => {
		return props.data.text;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
