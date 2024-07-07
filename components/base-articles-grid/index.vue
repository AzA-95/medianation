<template>
	<section
		v-if="items"
		class="base-articles-grid"
	>
		<BaseBlockTitle>
			<h2>{{ title }}</h2>
		</BaseBlockTitle>
		<div class="articles">
			<div class="container">
				<div class="grid">
					<div
						v-for="(item, index) in items"
						:key="index"
						class="article"
						:class="[item.show_type]"
					>
						<BaseArticleCard :data="item" />
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
	import BaseArticleCard from '@/components/base-article-card';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const title = computed(() => {
		return props.data.name;
	});

	const items = computed(() => {
		const items = props.data.items;

		return items && items.length ? items : null;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
