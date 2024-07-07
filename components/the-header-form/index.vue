<template>
	<div
		ref="rootEl"
		class="the-header-form"
	>
		<div
			ref="scrollPosEl"
			class="scroll-pos"
		></div>
		<div class="close-form-btn">
			<BaseButton
				theme="second"
				:modifier-classes="['without-default-hover']"
				@click="onCloseForm"
			>
				<template #default>Закрыть</template>
				<template #right-icon>
					<i class="close-form-btn__icon"></i>
				</template>
			</BaseButton>
		</div>
		<div class="the-header-form__inner">
			<div class="top-text">Центральный офис в Москве</div>
			<div class="header">
				<template v-if="phones">
					<a
						v-for="x in phones"
						:key="x.phone"
						:href="'tel:' + x.phone"
						class="phone"
					>
						{{ x.label }}
					</a>
				</template>

				<span class="worktime">Пн-Пт: с 10:00 до 19:00</span>
			</div>
			<div
				v-if="isSuccess"
				class="success"
			>
				<BaseFormSuccessMessage @close="onCloseForm" />
			</div>

			<template v-else-if="fields">
				<div class="form">
					<BaseForm
						:scrollable-el="() => rootEl"
						:scroll-to-el="() => scrollPosEl!"
						:show-tab-btns="true"
						:fields="fields"
						:send-url="submitUrl!"
						:modifier-classes-btn="['sliding-hover']"
						:modifier-classes-agree="['header-form']"
						@success="onShowSuccessMessage"
					/>
				</div>
			</template>

			<div class="socials">
				<BaseSocials />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed } from 'vue';
	import type { FormType } from '@/types/forms';
	import { useMenuStore } from '@/stores/menu';
	import { useApiFetch } from '@/composables/use-api-fetch';
	import { transformFormFields } from '@/utils/transforms';
	import BaseFormSuccessMessage from '@/components/base-form-succes-message';
	import BaseButton from '@/components/base-button';
	import BaseForm from '@/components/base-form';
	import BaseSocials from '@/components/base-socials';

	const emits = defineEmits<{
		(e: 'close-form'): void;
	}>();

	const rootEl = ref<HTMLElement>();
	const scrollPosEl = ref<HTMLElement>();

	const menuStore = useMenuStore();

	const phones = computed(() => {
		const phones = menuStore.menuContent?.phones;
		return phones?.length ? phones.slice(1) : null;
	});

	const { data } = await useApiFetch<FormType>('/form/order/');

	const fields = computed(() => {
		const fields = data.value?.settings?.fields;

		if (fields) {
			return transformFormFields(fields);
		}

		return null;
	});

	const submitUrl = computed(() => {
		return data.value?.settings.submit;
	});

	const isSuccess = ref(false);

	const onShowSuccessMessage = () => {
		isSuccess.value = true;
	};

	const onCloseForm = () => {
		emits('close-form');
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
