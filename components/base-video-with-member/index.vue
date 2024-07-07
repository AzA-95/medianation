<template>
	<div
		v-if="videoItem"
		class="base-video-with-member"
	>
		<div class="container">
			<div class="row">
				<div class="video">
					<BaseVideo
						:start-index="0"
						:picture="videoItem.picture"
						:items="[{ src: videoItem.video.link }]"
						:time="videoItem.video.time || null"
						:shadow="true"
					/>
					<div class="video__name">{{ videoItem.name }}</div>
				</div>
				<div
					v-if="member"
					class="member"
				>
					<div class="member__pic">
						<img
							v-lazy
							:data-src="member.picture"
							alt="member"
						/>
					</div>
					<div class="member__desc">
						<div class="member__name">{{ member.name }}</div>
						<div
							v-if="member.position"
							class="member__position"
						>
							{{ member.position }}
						</div>
						<div
							v-if="member.text"
							class="member__text"
						>
							{{ member.text }}
						</div>
					</div>
				</div>
			</div>
			<div
				v-if="bottomText"
				class="bottom-text"
				v-html="bottomText"
			></div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';
	import type { BaseType } from './type';
	import BaseVideo from '@/components/base-video';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const videoItem = computed(() => {
		const item = props.data.video.item;

		return item || null;
	});

	const member = computed(() => {
		const item = props.data.member.item;
		const normalizedItem = item
			? {
					...item,
					text: props.data.member.text,
				}
			: null;

		return normalizedItem;
	});

	const bottomText = computed(() => {
		return props.data.additional_text || null;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
