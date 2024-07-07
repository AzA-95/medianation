<template>
	<section class="base-clients-grid">
		<div class="container">
			<h2 class="title">{{ title }}</h2>
			<div class="grid">
				<div
					v-for="(item, index) in items"
					:key="index"
					class="pic"
					:style="`
							--img-width: ${item.picture_params.width};
							--img-height: ${item.picture_params.height};
						`"
				>
					<img
						v-lazy
						:data-src="item.picture"
						alt="logo"
					/>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import type { PropType } from 'vue';
	import type { BaseType } from './type';

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
		return props.data.items;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
