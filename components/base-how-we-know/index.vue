<template>
	<section class="base-how-we-know">
		<div class="container">
			<h2 class="title">{{ title }}</h2>
			<div class="items">
				<div
					v-for="(item, index) in items"
					:key="index"
					class="item"
				>
					<div class="number">{{ index + 1 }}.</div>
					<div
						class="desc"
						v-html="item.text"
					></div>
				</div>
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
	});

	const title = computed(() => {
		return props.data.title;
	});

	const items = computed(() => {
		return props.data.items;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
