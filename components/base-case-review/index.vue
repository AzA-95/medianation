<template>
	<div
		v-if="item"
		class="base-case-review"
	>
		<div class="container">
			<h2 class="title">{{ title }}</h2>
			<div class="review">
				<BaseReview :data="item" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';
	import type { BaseType } from './type';
	import BaseReview from '@/components/base-review';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const title = computed(() => {
		return props.data.name;
	});

	const item = computed(() => {
		const items = props.data.items;

		if (items && items[0]) {
			return {
				...items[0],
				name: null, // перезаписывем так как по дизайну название не предусматривается у отзыва кейса
			};
		}

		return null;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
