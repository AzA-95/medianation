<template>
	<BaseServiceBanner
		v-if="content"
		:data="content"
	/>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';
	import type { BaseType } from './type';
	import BaseServiceBanner from '@/components/base-banner-service';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const normalizePrice = (price: string) => {
		return price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
	};

	const content = computed(() => {
		const data = props.data;

		// is component_name: StaticBannerGallery
		if ('price_from' in data) {
			return {
				background: data.background,
				breadcrumbs: data.breadcrumbs,
				title: data.title,
				description: data.description,
				price_caption: 'Стоимость услуги',
				price: `от ${normalizePrice(data.price_from)} ₽`,
				awards: data.awards,
				order_button: null,
			};
		} else {
			// is component_name: BannerGallery
			// used only in this page https://medianation.ru/services/issledovaniya/
			const items = data.slider.items;
			const hasData = items && items.length > 0;

			if (!hasData) {
				return null;
			}

			const item = items![0];

			return {
				background: '',
				breadcrumbs: data.breadcrumbs,
				// title: item.title,
				// description: item.text,
				title: 'Нужен будет контент если дадут добро на переделку',
				description: item.title,
				awards: data.awards,
				price_caption: 'Стоимость услуги',
				price: null,
				order_button: null,
			};
		}
	});
</script>
