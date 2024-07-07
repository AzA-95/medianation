<template>
	<div
		class="base-file-input-resume"
		:class="{ disabled: disabled, selected: selected }"
	>
		<span
			v-if="acceptText"
			class="format"
		>
			Формат ({{ acceptText }})
		</span>

		<span class="btn">
			<input
				class="input"
				type="file"
				:name="multiple ? `${name}[]` : name"
				:multiple="multiple"
				:accept="accept"
				title=""
				@change="onChange"
			/>

			<span
				v-if="!selected"
				class="state"
			>
				Прикрепить резюме
			</span>
			<span
				v-else
				class="state state_success"
			>
				Резюме прикреплен
			</span>
		</span>
	</div>
</template>

<script setup lang="ts">
	import { toRefs, computed } from 'vue';

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

	const { name, multiple, accept, disabled, selected } = toRefs(props);

	const onChange = (e: Event) => {
		emits('change', e);
	};

	const acceptText = computed(() => {
		if (accept!.value) {
			const formats = accept!.value.split(',');

			return formats
				.map((format) => {
					return format.replace('.', '');
				})
				.join(', ');
		}

		return null;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
