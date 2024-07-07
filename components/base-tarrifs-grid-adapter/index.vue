<template>
	<BaseTarrifGrid :data="content" />
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';
	import type { BaseType } from './type';
	import BaseTarrifGrid from '@/components/base-tarrifs-grid';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const transformDataToHtml = (
		text: string | null,
		features: string[] | null,
	) => {
		if (text || features) {
			let content = `${text ? `<p>${text}</p>` : ''}`;

			content += `${
				features && features.length
					? `
						<ul>
							${features
								.map(
									(text: string) => `
										<li>${text}</li>
									`,
								)
								.join('')}
						</ul>
					`
					: ''
			}`;

			return content;
		}

		return null;
	};

	const items = computed(() => {
		return props.data.items.map((item) => {
			return {
				name: item.name,
				price: item.price,
				advantages: item.advantages,
				html: transformDataToHtml(item.text, item.features),
				button_name: item.button_name,
			};
		});
	});

	const content = computed(() => {
		return {
			title: props.data.name,
			items: items.value,
		};
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
