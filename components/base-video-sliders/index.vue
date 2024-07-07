<template>
	<section
		v-if="items"
		class="base-video-sliders"
	>
		<BaseBlockTitle>
			<h2>{{ title }}</h2>
		</BaseBlockTitle>

		<BaseVideoSliderWithDescription
			v-for="(item, index) in items"
			:key="index"
			:data="item"
			:modifier-classes="[index === 0 ? 'second-bg' : 'third-bg']"
		/>
	</section>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';
	import type { BaseType } from './type';
	import BaseBlockTitle from '@/components/base-block-title';
	import BaseVideoSliderWithDescription from '@/components/base-video-slider-with-description';

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

		if (items && items.length > 0) {
			return items;
		}

		return null;
	});
</script>
