<template>
	<section
		class="base-warranties"
		:class="[modifierClasses]"
	>
		<div class="container">
			<h2 class="title">{{ title }}</h2>
			<div class="warranties">
				<div
					v-for="(item, index) in items"
					:key="index"
					class="warranty"
				>
					<div class="icon">
						<img
							v-lazy
							:data-src="item.icon"
							alt="icon"
						/>
					</div>
					<div
						class="text"
						v-html="item.name"
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

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
		modifierClasses: {
			type: Array as PropType<'col-wide'[] | null>,
			default: null,
		},
	});

	const modifierClasses = computed(() => {
		return props.modifierClasses?.map((item) => {
			return `base-warranties_${item}`;
		});
	});

	const title = computed(() => {
		return props.data.name;
	});

	const items = computed(() => {
		return props.data.items;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
