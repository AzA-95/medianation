<template>
	<div class="base-back-and-share-btns">
		<div
			class="back"
			@click="back"
		>
			<div class="back__text">{{ backText }}</div>
		</div>
		<div
			ref="shareEl"
			class="share"
			:class="{ active: isShareActive }"
		>
			<div
				class="share__inner"
				@click="onToggleShare"
			>
				<div class="share__text">Поделиться</div>
			</div>
			<div class="share__list">
				<div
					v-for="(item, index) in shareSocialsData"
					:key="index"
					class="share__link"
				>
					<BaseShareSocialBtn :data="item">
						<BaseIcon :name="`svg/${item.iconName}`" />
					</BaseShareSocialBtn>
				</div>
				<div class="share__copy">
					<BaseShareCopyBtn :text="shareSocialsData[0].url" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { ref, computed, onMounted } from 'vue';
	import { useRouter } from 'vue-router';
	import type { BaseType } from './type';
	import { useClickOutside } from '@/composables/use-click-outside';
	import BaseIcon from '@/components/base-icon';
	import BaseShareSocialBtn from '@/components/base-share-social-btn';
	import BaseShareCopyBtn from '@/components/base-copy-btn';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const backText = computed(() => {
		return props.data.back_text;
	});

	const backLink = computed(() => {
		return props.data.back_link;
	});

	const shareSocialsData = computed(() => {
		const data = props.data.socials_data;

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

	const router = useRouter();

	const back = () => {
		const from = router.options.history.state.back;

		if (from === backLink.value) {
			router.back();
			return;
		}

		router.push(backLink.value);
	};

	const shareEl = ref<HTMLElement>();
	const isShareActive = ref(false);

	const onToggleShare = () => {
		isShareActive.value = !isShareActive.value;
	};

	const onCloseShare = () => {
		isShareActive.value = false;
	};

	const clickOutside = useClickOutside();

	onMounted(() => {
		if (shareEl.value) {
			clickOutside(shareEl.value, onCloseShare);
		}
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
