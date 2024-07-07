<template>
	<div
		class="base-input"
		:class="[modifierClasses]"
	>
		<div
			class="field"
			:class="{
				full: inputValueModel,
				invalid: error,
			}"
		>
			<input
				v-model="inputValueModel"
				class="input"
				:type="type"
				:name="name"
				:required="required"
				v-bind="attrs"
			/>

			<label class="label">
				<span :class="{ required: required }">
					{{ label }}
				</span>
			</label>
		</div>

		<div
			v-if="error"
			class="error"
		>
			{{ error }}
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { useAttrs, ref, toRefs, computed } from 'vue';

	defineOptions({
		inheritAttrs: false,
	});

	const attrs = useAttrs();

	const emits = defineEmits<{
		(e: 'update:modelValue', value: string | number): void;
	}>();

	const props = defineProps({
		type: {
			type: String,
			default: 'text',
		},
		name: {
			type: String,
			required: true,
		},
		required: {
			type: Boolean,
			default: false,
		},
		initialValue: {
			type: [String, Number],
			default: '',
		},
		useVModel: {
			type: Boolean,
			default: true,
		},
		modelValue: {
			type: [String, Number],
			default: '',
		},
		label: {
			type: String,
			required: true,
		},
		error: {
			type: String,
			default: '',
		},
		modifierClasses: {
			type: Array as PropType<'light'[] | null>,
			default: null,
		},
	});

	const { type, name, required, label, error } = toRefs(props);

	const modifierClasses = computed(() => {
		return props.modifierClasses?.map((item) => {
			return `base-input_${item}`;
		});
	});

	const useVModel = props.useVModel;
	const inputValue = ref(props.initialValue);

	const inputValueModel = computed({
		get() {
			// Проверяем если присвоин родительский v-model компоненту то используем его значене пропса(modelValue)
			// Иначе используем значение от (inputValue) чтобы коректно обновлять значения инпута
			if (useVModel) {
				return props.modelValue;
			}

			return inputValue.value;
		},
		set(val) {
			// Тригерим событие (update:modelValue) если присвоин родительский v-model компоненту и выходим с функции
			// Иначе присваиваем переменой (inputValue) новое значение чтобы обновить значения инпута
			if (useVModel) {
				emits('update:modelValue', val);
				return;
			}

			inputValue.value = val;
		},
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
