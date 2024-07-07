<template>
	<div class="base-share-socials-blog">
		<div class="title">Поделиться этой статьёй:</div>
		<div class="social-links">
			<div
				v-for="(item, index) in shareSocialsData"
				:key="index"
				class="social-links__link"
			>
				<BaseShareSocialBtn :data="item">
					<BaseIcon :name="`svg/${item.iconName}`" />
				</BaseShareSocialBtn>
			</div>
			<div class="social-links__copy">
				<BaseShareCopyBtn :text="shareSocialsData[0].url" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';
	import type { BaseShareSocialsBlogType } from './type';
	import BaseShareSocialBtn from '@/components/base-share-social-btn';
	import BaseShareCopyBtn from '@/components/base-copy-btn';
	import BaseIcon from '@/components/base-icon';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseShareSocialsBlogType>,
			required: true,
		},
	});

	const shareSocialsData = computed(() => {
		const data = props.data.share_socials_data;

		return [
			{
				...data,
				network: 'vk' as const,
				iconName: 'vk-square',
				share_text: 'Поделиться в вконтакте',
			},
			{
				...data,
				network: 'telegram' as const,
				iconName: 'telegram-circle',
				share_text: 'Поделиться в телеграме',
			},
			{
				...data,
				network: 'linkedin' as const,
				iconName: 'linkedin',
				share_text: 'Поделиться в линкедине',
			},
		];
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
