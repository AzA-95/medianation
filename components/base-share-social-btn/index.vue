<template>
	<a
		:href="shareUrl"
		target="_blank"
		rel="nofollow noopener"
		class="base-share-social-btn"
		:title="shareText"
		@click="onOpenWindowPopup"
	>
		<slot></slot>
	</a>
</template>

<script setup lang="ts">
	import { computed, type PropType } from 'vue';
	import type { BaseShareSocialBtnType } from './type';
	import {
		getShareLink,
		useShareSocial,
	} from '@/composables/use-share-social';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseShareSocialBtnType>,
			required: true,
		},
	});

	const shareText = computed(() => {
		return props.data.share_text;
	});

	const shareUrl = computed(() => {
		return getShareLink(props.data);
	});

	const onOpenWindowPopup = (e: Event) => {
		e.preventDefault();

		useShareSocial(props.data);
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
