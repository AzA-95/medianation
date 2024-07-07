<template>
	<section class="base-you-get">
		<div class="container">
			<h2 class="title">{{ title }}</h2>
			<div class="grid">
				<div
					v-for="(item, index) in items"
					:key="index"
					class="col"
				>
					<div class="number">{{ index + 1 }}.</div>
					<div class="text">{{ item.text }}</div>
				</div>
				<div class="col col_logo">
					<img
						v-lazy
						class="logo-pic"
						:data-src="company.picture"
						alt="logo"
					/>
					<a
						:href="company.link"
						target="_blank"
						class="logo-link"
					></a>
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

	const company = computed(() => {
		return props.data.company;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
