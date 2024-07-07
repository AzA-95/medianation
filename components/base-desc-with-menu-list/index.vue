<template>
	<div
		class="base-desc-with-menu-list"
		:class="{ 'has-mb': !items || bottomText }"
	>
		<div
			v-if="title || description"
			class="top"
		>
			<div class="container">
				<div class="top-content">
					<h2
						v-if="title"
						class="title"
					>
						{{ title }}
					</h2>
					<div
						v-if="description"
						class="description"
					>
						<BaseTexDefault :data="description" />
					</div>
				</div>
			</div>
		</div>
		<div
			v-if="items"
			class="menu-lists"
		>
			<BaseMenuList :data="items" />
		</div>
		<div
			v-if="bottomText"
			class="bottom"
		>
			<div class="container">
				<div
					class="bottom-text"
					v-html="bottomText"
				></div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';
	import type { BaseDescWithMenuListType } from './type';
	import BaseTexDefault from '@/components/base-text-default';
	import BaseMenuList from '@/components/base-menu-list';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseDescWithMenuListType>,
			required: true,
		},
	});

	// fix me format api wrap component with adapter
	const title = computed(() => {
		return props.data.name || null;
	});

	const description = computed(() => {
		const content = props.data.text || props.data.description;

		if (!content) return null;

		return {
			html: content,
		};
	});

	// fix me move v-if to parent after checked all service pages
	// Before fix it fix https://medianation.ru/services/prodvizhenie-magazina-mebeli/ content in page
	const items = computed(() => {
		const items =
			props.data.items || Array.isArray(props.data.menu)
				? props.data.menu
				: props.data.menu?.items;

		if (items?.length === 0) return null;

		return {
			items,
		};
	});

	const bottomText = computed(() => {
		return props.data.additional_html || null;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
