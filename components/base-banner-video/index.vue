<template>
	<section
		class="base-banner-video"
		:class="{ 'base-banner-video_hidden': isHidden }"
	>
		<div class="video">
			<video
				ref="videoEl"
				v-lazy
				preload="none"
				:data-src="video"
				loop
				@timeupdate="onTimeUpdate"
			></video>
		</div>
		<div class="container">
			<div class="inner">
				<div class="breadcrumbs">
					<BaseBreadcrumbs
						:breadcrumbs="breadcrumbs"
						:modifier-classes="['white']"
					></BaseBreadcrumbs>
				</div>
				<div class="desc">
					<h1 class="title">{{ title }}</h1>
					<div
						ref="playIconEl"
						class="play-icon"
					>
						<BasePlayIcon
							:time="time"
							@click="onPlayPauseVideo"
						/>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { ref, computed, onMounted } from 'vue';
	import type { BaseType } from './type';
	import { useClickOutside } from '@/composables/use-click-outside';
	import BaseBreadcrumbs from '@/components/base-breadcrumbs';
	import BasePlayIcon from '@/components/base-play-icon';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const breadcrumbs = computed(() => {
		return props.data.breadcrumbs;
	});

	const title = computed(() => {
		return props.data.title;
	});

	const video = computed(() => {
		return props.data.video.mp4;
	});

	const isHidden = ref(false);
	const time = ref(props.data.video.time);
	const videoEl = ref<HTMLVideoElement>();

	const onPauseVideo = () => {
		isHidden.value = false;
		videoEl.value?.pause();
	};

	const onPlayPauseVideo = () => {
		isHidden.value = !isHidden.value;

		if (isHidden.value) {
			videoEl.value?.play();
		} else {
			videoEl.value?.pause();
		}
	};

	const onTimeUpdate = () => {
		const duration = videoEl.value?.duration;
		const currentTime = videoEl.value?.currentTime;

		if (duration && currentTime) {
			const minutes = Math.floor((duration - currentTime) / 60);
			const seconds = Math.floor((duration - currentTime) % 60);

			const minutesString = minutes > 9 ? `${minutes}` : `0${minutes}`;
			const secondsString = seconds > 9 ? `${seconds}` : `0${seconds}`;

			time.value = `${minutesString}:${secondsString}`;
		}
	};

	const playIconEl = ref<HTMLElement>();
	const clickOutside = useClickOutside();

	onMounted(() => {
		if (playIconEl.value) {
			clickOutside(playIconEl.value, onPauseVideo);
		}
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
