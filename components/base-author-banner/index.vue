<template>
	<section class="base-author-banner">
		<div class="container">
			<div class="content">
				<div class="breadcrumbs">
					<BaseBreadcrumbs
						:breadcrumbs="breadcrumbs"
					></BaseBreadcrumbs>
				</div>
				<h1 class="title">{{ title }}</h1>
				<div class="sub-title">{{ position }}</div>
				<div class="pic-wrap">
					<div class="pic">
						<img
							v-lazy
							:data-src="picture"
							:alt="title"
						/>
					</div>
				</div>
				<div
					v-if="properties"
					class="properties"
				>
					<div
						v-for="(item, index) in properties"
						:key="index"
						class="property-value"
					>
						<div class="property">{{ item.property }}</div>
						<div class="value">{{ item.value }}</div>
					</div>
				</div>
				<div
					v-if="text"
					class="biography"
				>
					<div class="biography__title">Краткая биография:</div>
					<div
						class="biography__text"
						v-html="text"
					></div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';
	import type { BaseType } from './type';
	import BaseBreadcrumbs from '@/components/base-breadcrumbs';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const breadcrumbs = computed(() => {
		return props.data.breadcrumbs;
	});

	const title = computed(() => {
		return props.data.name;
	});

	const position = computed(() => {
		return props.data.position;
	});

	const picture = computed(() => {
		return props.data.picture;
	});

	const properties = computed(() => {
		const education = props.data.education;
		const experience = props.data.experience;

		const items: { property: string; value: string }[] = [];

		if (education) {
			items.push({
				property: 'Образование:',
				value: education,
			});
		}

		if (experience) {
			items.push({
				property: 'Опыт работы:',
				value: experience,
			});
		}

		return items.length > 0 ? items : null;
	});

	const text = computed(() => {
		return props.data.text;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
