<template>
	<div
		class="base-textarea"
		:class="[modifierClasses]"
	>
		<div
			ref="fieldEl"
			class="field"
			:class="{
				full: inputValueModel,
				invalid: error,
			}"
		>
			<textarea
				v-model="inputValueModel"
				class="textarea"
				:name="name"
				:required="required"
				v-bind="attrs"
			></textarea>

			<label class="label">
				<span
					ref="labelEl"
					:class="{ required: required }"
					v-html="label"
				></span>
			</label>

			<div class="line"></div>
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
	import { useAttrs, ref, toRefs, computed, onMounted } from 'vue';
	import { useWindowResizeAxisX } from '@/composables/use-window-resize-axis-x';

	defineOptions({
		inheritAttrs: false,
	});

	const attrs = useAttrs();

	const emits = defineEmits<{
		(e: 'update:modelValue', value: string | number): void;
	}>();

	const props = defineProps({
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
		modifierClasses: {
			type: Array as PropType<
				('with-file' | 'with-file-resume')[] | null
			>,
			default: null,
		},
		label: {
			type: String,
			required: true,
		},
		error: {
			type: String,
			default: '',
		},
	});

	const { name, required, label, error } = toRefs(props);

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

	const modifierClasses = computed(() => {
		return props.modifierClasses?.map((item) => {
			return `base-textarea_${item}`;
		});
	});

	const fieldEl = ref<HTMLElement>();
	const labelEl = ref<HTMLElement>();

	const setLabelHeightToCssVar = () => {
		const field = fieldEl.value;
		const label = labelEl.value;

		if (field && label) {
			document.fonts.ready.then(() => {
				label.style.fontSize = '18px'; // see style font-size of .label
				const labelHeight = label.offsetHeight;
				label.style.fontSize = '';

				label.style.fontSize = '12px'; // see style font-size of .label .textarea:focus
				const labelHeightSmall = label.offsetHeight;
				label.style.fontSize = '';

				field.style.setProperty(
					'--label-full-height',
					`${labelHeight}px`,
				);

				field.style.setProperty(
					'--label-small-height',
					`${labelHeightSmall}px`,
				);
			});
		}
	};

	const eventListenerResizeAxisX = useWindowResizeAxisX();

	onMounted(() => {
		setLabelHeightToCssVar();
		eventListenerResizeAxisX(setLabelHeightToCssVar);
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
