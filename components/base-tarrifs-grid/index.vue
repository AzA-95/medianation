<template>
	<section class="base-tarrifs-grid">
		<BaseBlockTitle :is-dark="isDark">
			<h2>{{ title }}</h2>
		</BaseBlockTitle>
		<div class="tarrifs">
			<div class="container">
				<div class="row">
					<div
						v-for="(item, index) in items"
						:key="index"
						class="tarrif"
					>
						<BaseTarrif
							:data="item"
							:is-dark="isDark"
						/>
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
	import BaseTarrif from '@/components/base-tarrif';

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
		return props.data.title;
	});

	const items = computed(() => {
		return props.data.items;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
