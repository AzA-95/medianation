<template>
	<div
		class="base-file-input"
		:class="{ disabled: disabled, selected: selected }"
	>
		<input
			class="input"
			type="file"
			:name="multiple ? `${name}[]` : name"
			:multiple="multiple"
			:accept="accept"
			title=""
			@change="onChange"
		/>
	</div>
</template>

<script setup lang="ts">
	import { toRefs } from 'vue';

	const emits = defineEmits<{
		(e: 'change', event: Event): void;
	}>();

	const props = defineProps({
		name: {
			type: String,
			required: true,
		},
		multiple: {
			type: Boolean,
			default: false,
		},
		accept: {
			type: String,
			default: null,
		},
		selected: {
			type: Boolean,
			required: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	});

	const { name, multiple, accept, disabled } = toRefs(props);

	const onChange = (e: Event) => {
		emits('change', e);
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
