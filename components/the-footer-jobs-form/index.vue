<template>
	<section class="the-footer-jobs-form">
		<div
			ref="scrollPosEl"
			class="scroll-pos js-the-footer-jobs-form__scroll-pos"
		></div>
		<div class="container">
			<div
				v-if="isSuccess"
				class="success"
			>
				<BaseFormSuccessMessage @close="onCloseSuccessMessage" />
			</div>

			<template v-else>
				<h2 class="title">
					{{ title }}
				</h2>
				<div
					class="caption"
					v-html="caption"
				></div>

				<div class="form">
					<BaseForm
						:scroll-to-el="() => scrollPosEl!"
						:fields="fields"
						:send-url="submitUrl"
						:modifier-classes="['indent-big', 'jobs-form']"
						:modifier-classes-btn="['sliding-hover']"
						:modifier-classes-agree="['jobs-form']"
						button-name="Отправить отклик"
						@success="onShowSuccessMessage"
					/>
				</div>
			</template>
		</div>
	</section>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { ref, computed } from 'vue';
	import type { BaseType } from './type';
	import { transformFormFields } from '@/utils/transforms';
	import BaseFormSuccessMessage from '@/components/base-form-succes-message';
	import BaseForm from '@/components/base-form';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const scrollPosEl = ref<HTMLElement>();

	const title = computed(() => {
		return props.data.name;
	});

	const caption = computed(() => {
		return props.data.caption;
	});

	const fields = computed(() => {
		// fix me api
		const transformedFields = transformFormFields(
			props.data.settings.fields,
		);

		const fields = transformedFields.map((field) => {
			if (field.field_name === 'name') {
				field.name = 'Как вас зовут?';
			}

			if (field.field_name === 'phone') {
				field.name = 'Телефон';
			}

			if (field.field_name === 'email') {
				field.name = 'Почта';
			}

			if (field.field_name === 'comment') {
				field.name =
					'Расскажите, чем вы занимаетесь, какие у вас цели?';
			}

			return field;
		});

		return fields;
	});

	const submitUrl = computed(() => {
		return props.data.settings.submit;
	});

	const isSuccess = ref(false);

	const onShowSuccessMessage = () => {
		isSuccess.value = true;
	};

	const onCloseSuccessMessage = () => {
		isSuccess.value = false;
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
