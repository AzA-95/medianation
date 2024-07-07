<template>
	<component
		:is="component"
		v-if="component"
		:data="content"
	/>
</template>

<script setup lang="ts">
	import type { Component, PropType } from 'vue';
	import { computed } from 'vue';
	import type { BaseType } from './type';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const content = computed(() => {
		return props.data;
	});

	let component: null | Component = null;

	const componentsPath = {
		video_reviews: 'base-video-reviews',
		video_with_member: 'base-video-with-member',
	};

	const componentName = computed(() => {
		const hasMember = {}.hasOwnProperty.call(props.data, 'member');

		return hasMember ? 'video_with_member' : 'video_reviews';
	});

	// Сделал по lazyload чтобы не грузить лишний компонент
	try {
		// fix me path replace to @
		const module = await import(
			`../${componentsPath[componentName.value]}/index.vue`
		);

		component = module.default;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Error on loading component', error);
	}
</script>

<style></style>
