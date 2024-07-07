<template>
	<section
		class="base-certificates"
		:class="[modifierClasses]"
	>
		<div class="container">
			<h2 class="title">{{ title }}</h2>

			<div class="numbers">
				<div
					v-for="(item, index) in numbers"
					:key="index"
					class="number"
				>
					<div class="number__count">{{ item.name }}</div>
					<div class="number__text">{{ item.text }}</div>
				</div>
			</div>

			<div class="toprates">
				<BaseIconPartners
					:data="awards"
					theme="dark"
					:modifier-classes="['toprates']"
				/>
			</div>

			<div
				v-if="certificates"
				class="certificates"
			>
				<div
					v-for="(item, index) in certificates"
					:key="index"
					class="certificate-list"
				>
					<BaseIconPartners
						:data="item"
						:modifier-classes="['certificate-bigger-mob']"
					/>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';
	import type { BaseType } from './type';
	import BaseIconPartners from '@/components/base-icon-partners';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
		modifierClasses: {
			type: Array as PropType<'title-on-left'[] | null>,
			default: null,
		},
	});

	const modifierClasses = computed(() => {
		return props.modifierClasses?.map((item) => {
			return `base-certificates_${item}`;
		});
	});

	const title = computed(() => {
		return props.data.name;
	});

	const numbers = computed(() => {
		return props.data.numbers.items;
	});

	const awards = computed(() => {
		return props.data.awards;
	});

	const certificates = computed(() => {
		const certificates = props.data.certificates?.items;

		if (certificates) {
			const items = certificates.filter((certificate) => {
				return certificate.items;
			});

			return items;
		}

		return null;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
