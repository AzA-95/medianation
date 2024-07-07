<template>
	<div class="error-page">
		<NuxtLayout>
			<div class="container">
				<h1>Error page</h1>
				<div class="status">{{ error.statusCode }}</div>
				<div class="error-data">{{ error }}</div>
				<br />
				<br />
				<br />
			</div>
		</NuxtLayout>
	</div>
</template>

<script setup lang="ts">
	import type { NuxtError } from 'nuxt/app';
	import type { PropType } from 'vue';
	import { computed } from 'vue';

	const props = defineProps({
		error: {
			type: Object as PropType<NuxtError>,
			required: true,
		},
	});

	const error = computed(() => {
		return props.error;
	});
</script>
