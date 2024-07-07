<template>
	<div
		class="base-block-title"
		:class="{ 'base-block-title_dark': isDark }"
	>
		<div class="container">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue';

	const props = defineProps({
		isDark: {
			type: Boolean,
			default: false,
		},
	});

	const isDark = computed(() => {
		return props.isDark;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
