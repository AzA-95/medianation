<template>
	<BaseModal
		ref="modalEl"
		:show="props.show"
		@close="onClosePopup"
	>
		<div class="base-subscribe-popup">
			<BaseSubscribeForm
				:data="data"
				:modifier-classes="['popup']"
				:scrollable-el="() => modalEl?.element || null"
			/>
			<div
				class="close"
				@click="onClosePopup"
			></div>
		</div>
	</BaseModal>
</template>

<script setup lang="ts">
	import type { PropType, UnwrapNestedRefs } from 'vue';
	import { ref } from 'vue';
	import type { ElementType as BaseModalElementType } from '@/components/base-modal/type';
	import type { BaseType as BaseFormSubscribeType } from '@/components/base-form-subscribe/type';
	import BaseModal from '@/components/base-modal';
	import BaseSubscribeForm from '@/components/base-form-subscribe';

	const emits = defineEmits<{
		(e: 'close'): void;
	}>();

	const props = defineProps({
		data: {
			type: Object as PropType<BaseFormSubscribeType>,
			required: true,
		},
		show: {
			type: Boolean,
			required: true,
		},
	});

	const modalEl = ref<UnwrapNestedRefs<BaseModalElementType>>();

	const onClosePopup = () => {
		emits('close');
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
