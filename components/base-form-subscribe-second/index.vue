<template>
	<div
		ref="scrollPosEl"
		class="base-form-subscribe-second"
	>
		<div class="container">
			<template v-if="isSuccess">
				<div class="success">
					<div class="success__title">Заявка отправлена</div>
					<div class="success__text">Спасибо, что обратились -)</div>
				</div>
			</template>
			<template v-else>
				<div class="row">
					<div class="col-left">
						<div class="title">
							{{ title }}
						</div>
						<div class="text">
							{{ text }}
						</div>
					</div>
					<div class="col-right">
						<div class="form">
							<BaseForm
								:scroll-to-el="() => scrollPosEl!"
								:fields="fields"
								:send-url="submitUrl"
								:modifier-classes-agree="[
									'subscribe-form-second',
								]"
								modifier-classes-theme-btn="fifth"
								:button-name="buttonName"
								@success="onShowSuccessMessage"
							/>
						</div>
					</div>
				</div>
			</template>
		</div>
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
	});

	const scrollPosEl = ref<HTMLElement>();

	const isSuccess = ref(false);

	const onShowSuccessMessage = () => {
		isSuccess.value = true;
	};

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
