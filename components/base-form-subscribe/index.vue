<template>
	<div
		ref="scrollPosEl"
		class="base-form-subscribe"
		:class="[modifierClasses]"
	>
		<template v-if="isSuccess">
			<div class="success">
				<div class="success__title">Заявка отправлена</div>
				<div class="success__text">Спасибо, что обратились -)</div>
			</div>
		</template>
		<template v-else>
			<div class="title">
				{{ title }}
			</div>
			<div
				class="text"
				v-html="text"
			></div>
			<div class="form">
				<BaseForm
					:scrollable-el="scrollableEl"
					:scroll-to-el="() => scrollPosEl!"
					:fixed-top="fixedTop"
					:fields="fields"
					:send-url="submitUrl"
					:modifier-classes="['subscribe-form']"
					:modifier-classes-input="['light']"
					:modifier-classes-agree="['subscribe-form']"
					modifier-classes-theme-btn="fifth"
					:button-name="buttonName"
					@success="onShowSuccessMessage"
				/>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { ref, computed } from 'vue';
	import type { BaseType } from './type';
	import { transformFormFields } from '@/utils/transforms';
	import BaseForm from '@/components/base-form';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
		scrollableEl: {
			type: Function as PropType<() => HTMLElement | null>,
			default: null,
		},
		fixedTop: {
			type: Number,
			default: 0,
		},
		modifierClasses: {
			type: Array as PropType<'popup'[] | null>,
			default: null,
		},
	});

	const modifierClasses = computed(() => {
		return props.modifierClasses?.map((item) => {
			return `base-form-subscribe_${item}`;
		});
	});

	const scrollPosEl = ref<HTMLElement>();

	const isSuccess = ref(false);

	const onShowSuccessMessage = () => {
		isSuccess.value = true;
	};

	const fixedTop = computed(() => {
		return props.fixedTop;
	});

	const title = computed(() => {
		return props.data.name;
	});

	const text = computed(() => {
		return props.data.caption;
	});

	const fields = computed(() => {
		// fix me api
		const transformedFields = transformFormFields(
			props.data.settings.fields,
		);

		const fields = transformedFields.map((field) => {
			if (field.field_name === 'name') {
				field.name = 'Ваше имя';
			}

			if (field.field_name === 'email') {
				field.name = 'E-mail';
			}

			return field;
		});

		return fields;
	});

	const submitUrl = computed(() => {
		return props.data.settings.submit;
	});

	const buttonName = computed(() => {
		return props.data.button_name;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
