<template>
	<div class="base-file">
		<div class="icon">
			<img
				v-lazy
				:data-src="imgUrl"
				alt="icon"
			/>
		</div>

		<div class="desc">
			<div class="name">{{ name }}</div>
			<div class="text">{{ position }}</div>
		</div>

		<a
			v-if="fileLink"
			:href="fileLink"
			class="full-link"
		></a>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';
	import type { BaseType } from './type';
	import imgUrl from './icons/pdf-icon.svg';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const name = computed(() => {
		return props.data.name;
	});

	const position = computed(() => {
		return props.data.position;
	});

	const fileLink = computed(() => {
		return props.data.fileLink;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
