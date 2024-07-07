<template>
	<section
		id="base-certificates-second"
		class="base-certificates-second"
		:class="`base-certificates-second_${theme}`"
	>
		<div class="container">
			<div class="head">
				<h2 class="title">{{ title }}</h2>
				<div
					class="top-desc"
					v-html="text"
				></div>
			</div>

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

			<div class="certificates">
				<div
					v-for="(item, index) in certificates"
					:key="index"
					class="certificate-list"
				>
					<BaseIconPartners
						:data="item"
						:theme="theme === 'dark' ? 'dark' : null"
						:modifier-classes="
							item.id === 'lists/award'
								? ['award-fixed-width', 'title-bg-sz']
								: ['title-bg-sz']
						"
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
		theme: {
			type: String as PropType<'dark' | 'light'>,
			default: 'dark',
		},
	});

	const title = computed(() => {
		return props.data.name;
	});

	const text = computed(() => {
		return props.data.text;
	});

	const numbers = computed(() => {
		return props.data.numbers.items;
	});

	const awards = computed(() => {
		return props.data.awards;
	});

	const certificates = computed(() => {
		const certificates = [...props.data.certificates.items];
		certificates.unshift(awards.value);

		const items = certificates.filter((certificate) => {
			return certificate.items;
		});

		return items;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
