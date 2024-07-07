<template>
	<section
		v-if="items"
		class="base-info-columns"
	>
		<BaseBlockTitle :is-dark="isTitleBlack">
			<h2>{{ title }}</h2>
		</BaseBlockTitle>
		<div
			v-match-height="{
				selectors: ['[data-match-height]'],
				isEnabled: (window: Window) => window.innerWidth > 1279,
			}"
			class="columns"
		>
			<div class="container">
				<div class="cols">
					<div
						v-for="(item, index) in items"
						:key="index"
						class="col"
					>
						<div
							ref="titles"
							class="col-title"
							data-match-height="true"
						>
							{{ item.name }}
						</div>
						<div
							v-if="item.caption"
							class="col-text"
						>
							{{ item.caption }}
						</div>
						<div
							v-if="item.html"
							class="col-list"
							v-html="item.html"
						></div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';
	import type { BaseType } from './type';
	import BaseBlockTitle from '@/components/base-block-title';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
		isTitleBlack: {
			type: Boolean,
			default: true,
		},
	});

	const title = computed(() => {
		return props.data.title;
	});

	const items = computed(() => {
		const items = props.data.items;

		return items && items.length ? items : null;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
