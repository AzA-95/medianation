<template>
	<div class="base-tarrif">
		<div class="title">{{ title }}</div>
		<div
			v-if="oldPrice"
			class="old-price"
		>
			{{ oldPrice }}
		</div>
		<div class="price">
			{{ price }}
		</div>
		<div
			v-if="advantages"
			class="info-columns"
		>
			<div
				v-for="(advantage, index) in advantages"
				:key="index"
				class="info"
			>
				<div class="info-title">{{ advantage.name }}</div>
				<div class="info-text">{{ advantage.description }}</div>
			</div>
		</div>
		<div
			v-if="text"
			class="text"
			v-html="text"
		></div>
		<div
			v-if="additionalService"
			class="additional-service"
		>
			<div class="service-row">
				<div class="service-title">{{ additionalService.name }}</div>
				<div class="service-label">{{ additionalService.label }}</div>
			</div>
			<div class="service-prices">
				<div class="service-price">{{ additionalService.price }}</div>
				<div class="service-old-price">
					{{ additionalService.old_price }}
				</div>
			</div>
		</div>
		<div class="btn">
			<BaseButton
				:theme="isDark ? 'fifth' : null"
				@click="onScrollToForm"
			>
				{{ buttonName }}
			</BaseButton>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';
	import type { BaseType } from './type';
	import { scrollTo } from '@/utils/ui';
	import BaseButton from '@/components/base-button';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
		isDark: {
			type: Boolean,
			default: false,
		},
	});

	const isDark = computed(() => {
		return props.isDark;
	});

	const title = computed(() => {
		return props.data.name;
	});

	const price = computed(() => {
		return props.data.price;
	});

	const oldPrice = computed(() => {
		return props.data.old_price;
	});

	const advantages = computed(() => {
		const advantages = props.data.advantages;
		return advantages && advantages.length > 0 ? advantages : null;
	});

	const text = computed(() => {
		return props.data.html;
	});

	const additionalService = computed(() => {
		return props.data.additional_service;
	});

	const buttonName = computed(() => {
		return props.data.button_name || 'Оставить заявку';
	});

	const onScrollToForm = () => {
		scrollTo({
			to: '.js-the-footer-form__scroll-pos',
		});
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
