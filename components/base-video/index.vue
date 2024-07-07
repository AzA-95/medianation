<template>
	<div
		class="base-video"
		:class="{
			'with-shadow': shadow,
		}"
		@click="onShowVideo()"
	>
		<div class="pic">
			<picture>
				<img
					v-lazy
					:data-src="picture"
					alt="preview"
				/>
			</picture>
		</div>
		<div class="play-icon">
			<BasePlayIcon
				:time="time"
				:modifier-classes="['without-hover']"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import type { PropType } from 'vue';
	import { useFancybox } from '@/composables/use-fancybox';
	import BasePlayIcon from '@/components/base-play-icon';

	const props = defineProps({
		picture: {
			type: String,
			required: true,
		},
		startIndex: {
			type: Number,
			default: 0,
		},
		time: {
			type: String as PropType<string | null>,
			default: null,
		},
		items: {
			type: Array as PropType<
				{
					src: string;
				}[]
			>,
			required: true,
		},
		shadow: {
			type: Boolean,
			default: false,
		},
	});

	const picture = computed(() => {
		return props.picture;
	});

	const shadow = computed(() => {
		return props.shadow;
	});

	const time = computed(() => {
		return props.time;
	});

	const fancybox = useFancybox();

	const onShowVideo = () => {
		fancybox.show(props.items, { startIndex: props.startIndex });
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
