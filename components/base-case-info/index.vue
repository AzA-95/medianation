<template>
	<section
		class="base-case-info"
		:class="[modifierClasses]"
	>
		<div class="container">
			<div class="row">
				<div class="col">
					<div class="desc">
						<h3 class="title">{{ name }}</h3>
						<div
							v-if="text"
							class="text"
							v-html="text"
						></div>
						<div class="detail-link">
							<NuxtLink
								:to="link"
								:external="isLinkRemote"
								:target="isLinkRemote ? '_blank' : null"
							>
								Подробнее
							</NuxtLink>
						</div>
					</div>
				</div>
				<div
					v-if="picture"
					class="col"
				>
					<div
						v-if="video"
						class="video"
					>
						<div class="video__pic">
							<img
								v-lazy
								:data-src="picture"
								:width="pictureParams?.width"
								:height="pictureParams?.height"
								alt="pic"
							/>
						</div>
						<div class="video__play-icon">
							<BasePlayIcon
								:time="video.time"
								:modifier-classes="['without-hover']"
								@click="onShowVideo"
							/>
						</div>
					</div>
					<div
						v-else
						class="photo"
					>
						<img
							v-lazy="{ rootMargin: '100%' }"
							:data-src="picture"
							:width="pictureParams?.width"
							:height="pictureParams?.height"
							alt="pic"
						/>
					</div>
					<div class="btn">
						<BaseButton
							:modifier-classes="['without-default-hover']"
							@click="onShowPopup"
						>
							{{ btnName }}
						</BaseButton>
					</div>
				</div>
			</div>
		</div>
		<ComercialPopup
			:show="isShowPopup"
			@close="onClosePopup"
		/>
	</section>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { ref, computed } from 'vue';
	import type { BaseType } from './type';
	import { useFancybox } from '@/composables/use-fancybox';
	import BasePlayIcon from '@/components/base-play-icon';
	import BaseButton from '@/components/base-button';
	import ComercialPopup from '@/components/comercial-popup';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
		modifierClasses: {
			type: Array as PropType<'has-line'[] | null>,
			default: null,
		},
	});

	const modifierClasses = computed(() => {
		return props.modifierClasses?.map((item) => {
			return `base-case-info_${item}`;
		});
	});

	const name = computed(() => {
		return props.data.name;
	});

	const text = computed(() => {
		return props.data.text;
	});

	const isLinkRemote = computed(() => {
		return props.data.is_link_remote || false;
	});

	const link = computed(() => {
		return props.data.link;
	});

	const video = computed(() => {
		return props.data.video;
	});

	const picture = computed(() => {
		return props.data.picture;
	});

	const pictureParams = computed(() => {
		return props.data.picture_params;
	});

	const btnName = computed(() => {
		return props.data.button_name || 'Получить коммерческое предложение';
	});

	const fancybox = useFancybox();

	const onShowVideo = () => {
		fancybox.show([
			{
				src: video.value!.link,
			},
		]);
	};

	const isShowPopup = ref(false);

	const onShowPopup = () => {
		isShowPopup.value = true;
	};

	const onClosePopup = () => {
		isShowPopup.value = false;
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
