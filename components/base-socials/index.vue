<template>
	<div
		class="base-socials"
		:class="[modifierClasses]"
	>
		<div
			v-for="(item, i) in socials"
			:key="i"
			class="social-item"
		>
			<a
				:href="item.link"
				target="_blank"
			>
				<BaseIcon :name="`svg/${item.iconName}`" />
			</a>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';
	import BaseIcon from '@/components/base-icon';

	const props = defineProps({
		modifierClasses: {
			type: Array as PropType<('big' | 'footer')[] | null>,
			default: null,
		},
	});

	const modifierClasses = computed(() => {
		return props.modifierClasses?.map((item) => {
			return `base-socials_${item}`;
		});
	});

	const socials = [
		{
			iconName: 'vk',
			link: 'https://vk.com/medianationagency',
		},
		{
			iconName: 'youtube',
			link: 'https://www.youtube.com/channel/UCbR0HuIbTYltEYdJlI3vSLA',
		},
		{
			iconName: 'telegram',
			link: 'https://t.me/MediaNation',
		},
		{
			iconName: 'y-zen',
			link: 'https://zen.yandex.ru/id/5b7c2f445be4fd00a9578101',
		},
	];
</script>

<style scoped lang="scss" src="./style.scss"></style>
