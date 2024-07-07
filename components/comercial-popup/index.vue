<template>
	<BaseModal
		ref="modalEl"
		:show="props.show"
		@close="onClosePopup"
	>
		<div
			ref="mainEl"
			class="comercial-popup"
		>
			<div
				class="close"
				@click="onClosePopup"
			></div>
			<template v-if="success">
				<div class="success">Собщение успешно отправлено</div>
			</template>
			<template v-else>
				<div class="title">Получить коммерческое предложение</div>

				<div
					v-if="fields"
					class="form"
				>
					<BaseForm
						:scrollable-el="() => modalEl?.element || null"
						:scroll-to-el="() => modalEl?.element!"
						:fields="fields"
						:send-url="submitUrl!"
						@success="onShowSuccessMessage"
					/>
				</div>
				<div
					v-else
					class="error"
				>
					Что-то пошло не так, и не удалось загурзить форму.
					<br />
					Попробуйте перезагрузить страницу, и повторить попытку еще
					раз
				</div>
			</template>
		</div>
	</BaseModal>
</template>

<script setup lang="ts">
	import type { UnwrapNestedRefs } from 'vue';
	import { ref, computed } from 'vue';
	import type { ElementType as BaseModalElementType } from '@/components/base-modal/type';
	import { useOfferFormStore } from '@/stores/offer-form';
	import { transformFormFields } from '@/utils/transforms';
	import BaseModal from '@/components/base-modal';
	import BaseForm from '@/components/base-form';

	const emits = defineEmits<{
		(e: 'close'): void;
	}>();

	const props = defineProps({
		show: {
			type: Boolean,
			required: true,
		},
	});

	const mainEl = ref<HTMLElement>();
	const modalEl = ref<UnwrapNestedRefs<BaseModalElementType>>();

	const success = ref(false);

	const onShowSuccessMessage = () => {
		success.value = true;
	};

	const formStore = useOfferFormStore();
	const data = await formStore.getFormData();

	const fields = computed(() => {
		const fieldsData = data?.settings?.fields;

		if (fieldsData) {
			const transformedFields = transformFormFields(fieldsData);

			// fix me api
			const fields = transformedFields.map((field) => {
				if (field.field_name === 'name') {
					field.name = 'Ваше имя';
				}

				if (field.field_name === 'site') {
					field.name = 'Сайт';
				}

				if (field.field_name === 'phone') {
					field.name = 'Телефон';
				}

				if (field.field_name === 'email') {
					field.name = 'E-mail';
				}

				if (field.field_name === 'comment') {
					field.name = 'Несколько предложений о вашей задаче';
				}

				return field;
			});

			return fields;
		}

		return null;
	});

	const submitUrl = computed(() => {
		return data?.settings.submit;
	});

	const onClosePopup = () => {
		emits('close');
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
