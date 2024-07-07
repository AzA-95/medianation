<template>
	<h1>New test Page</h1>
	<pre>{{ data }}</pre>
</template>

<script setup lang="ts">
	import { useApiFetch } from '@/composables/use-api-fetch';
	const { data } = await useApiFetch('http://localhost:3000/api/hello');
	console.log('exec 2');
</script>
