<template>
	<BaseModal
		:show="true"
		@close="onClosePopup"
	>
		<div class="base-tariff-popup">
			<div
				class="close"
				@click="onClosePopup"
			>
				Закрыть
			</div>
			<div class="top">
				<div class="title">{{ title }}</div>
				<div class="price">{{ price }}</div>
			</div>
			<div
				class="text"
				v-html="text"
			></div>
			<div
				v-if="columns"
				class="info-columns"
			>
				<div
					v-for="(column, index) in columns"
					:key="index"
					class="info-column"
				>
					<div class="info-title">{{ column.info_tite }}</div>
					<div class="info-text">{{ column.info_text }}</div>
				</div>
			</div>
			<div class="btn">
				<BaseButton @click="onScrollToForm">Оставить заявку</BaseButton>
			</div>
		</div>
	</BaseModal>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import type { PropType } from 'vue';
	import type { BaseType } from './type';
	import { scrollTo } from '@/utils/ui';
	import BaseModal from '@/components/base-modal';
	import BaseButton from '@/components/base-button';

	const emits = defineEmits<{
		(e: 'close'): void;
	}>();

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const title = computed(() => {
		return `Тариф «${props.data.name}»`;
	});

	const price = computed(() => {
		return props.data.price;
	});

	const text = computed(() => {
		return props.data.text;
	});

	const columns = computed(() => {
		return props.data.columns;
	});

	const onClosePopup = () => {
		emits('close');
	};

	const onScrollToForm = () => {
		onClosePopup();

		scrollTo({
			to: '.js-the-footer-form__scroll-pos',
		});
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
