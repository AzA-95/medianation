<template>
	<section
		id="base-adindex-rating"
		class="base-adindex-rating"
	>
		<div class="container">
			<h2 class="title">{{ title }}</h2>
			<div class="small-title">{{ bottomTitle }}</div>
			<div class="content">
				<div
					class="text"
					v-html="text"
				></div>
				<div class="pic">
					<img
						v-lazy
						:data-src="picture"
						alt="pic"
					/>
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

	const bottomTitle = computed(() => {
		return props.data.bottom_title;
	});

	const text = computed(() => {
		return props.data.text;
	});

	const picture = computed(() => {
		return props.data.picture;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
