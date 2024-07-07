<template>
	<div class="base-benefit">
		<div class="pic">
			<img
				v-lazy
				:data-src="picture"
				alt="icon"
			/>
		</div>
		<div class="text">
			{{ text }}
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
	});

	const picture = computed(() => {
		return props.data.icon;
	});

	const text = computed(() => {
		return props.data.text;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
