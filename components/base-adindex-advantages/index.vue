<template>
	<section
		id="base-adindex-advantages"
		class="base-adindex-advantages"
	>
		<div class="container">
			<h2
				class="title"
				v-html="title"
			></h2>
			<div class="see-in-site">
				<a
					:href="link"
					target="_blank"
				>
					Посмотреть на сайте Adindex
				</a>
			</div>
			<div class="authors-with-text">
				<div class="pic">
					<img
						v-lazy
						:data-src="authors"
						alt="pic"
					/>
				</div>
				<div
					class="text"
					v-html="text"
				></div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';
	import authors from './images/authors.png';
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

	const link = computed(() => {
		return props.data.link;
	});

	const text = computed(() => {
		return props.data.text;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
