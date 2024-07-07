<template>
	<span
		class="base-icon"
		v-html="icon"
	></span>
</template>

<script setup lang="ts">
	import { ref } from 'vue';

	const props = defineProps({
		name: {
			type: String,
			required: true,
		},
	});

	const icon = ref<string>('');

	async function getIcon() {
		try {
			const iconsImport = import.meta.glob('@/assets/icons/**/**.svg', {
				eager: false,
				query: '?raw',
				import: 'default',
			});

			const rawIcon =
				await iconsImport[`/assets/icons/${props.name}.svg`]();

			icon.value = rawIcon;
		} catch {
			console.error(
				`Icon '${props.name}' doesn't exist in 'assets/icons'`,
			);
		}
	}

	await getIcon();
</script>

<style scoped lang="scss" src="./style.scss"></style>
