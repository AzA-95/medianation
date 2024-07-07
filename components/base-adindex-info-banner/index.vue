<template>
	<section
		id="base-adindex-info-banner"
		class="base-adindex-info-banner"
	>
		<div class="container">
			<div class="row">
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
	import picture from './images/pic.jpg';
	import type { BaseType } from './type';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const text = computed(() => {
		return props.data.text;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
