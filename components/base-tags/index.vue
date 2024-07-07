<template>
	<div class="base-tags">
		<div class="container">
			<div class="tags">
				<template
					v-for="(item, index) in items"
					:key="index"
				>
					<NuxtLink
						v-if="item.link"
						:to="item.link"
						class="tag"
						:class="{ active: item.current }"
					>
						{{ item.name }}
					</NuxtLink>
					<div
						v-else
						class="tag"
						:class="{ active: item.current }"
						@click="onChange(item.id)"
					>
						{{ item.name }}
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';
	import type { BaseType } from './type';
	import { NuxtLink } from '#components';

	const emits = defineEmits<{
		(e: 'change', event: string | number): void;
	}>();

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const items = computed(() => {
		return props.data.items;
	});

	const onChange = (id: string | number) => {
		emits('change', id);
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
