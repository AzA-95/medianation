<template>
	<div class="base-case-card">
		<div class="bg">
			<img
				v-lazy
				:data-src="picture"
				alt="pic"
			/>
		</div>
		<div class="content">
			<div
				v-if="client"
				class="client-logo"
			>
				<img
					v-lazy
					:data-src="client.picture"
					:width="client.width"
					:height="client.height"
					alt="client"
				/>
			</div>
			<div class="title">
				{{ name }}
			</div>
			<div
				v-if="text"
				class="text"
				v-html="text"
			></div>
			<div
				v-if="textAdditional"
				class="info"
				v-html="textAdditional"
			></div>
			<div
				v-if="videoReview"
				class="review"
			>
				<a
					target="_blank"
					class="review-link"
					:href="videoReview.video"
				>
					{{ videoReview.name }}
				</a>
			</div>
			<div class="categories">
				<div
					v-for="(item, index) in services"
					:key="index"
					class="category"
				>
					<NuxtLink
						:to="item.link"
						class="category-link"
					>
						{{ item.name }}
					</NuxtLink>
				</div>
			</div>
			<NuxtLink
				:to="link"
				class="full-link"
			></NuxtLink>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';
	import type { BaseType } from './type';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const picture = computed(() => {
		return props.data.picture;
	});

	const client = computed(() => {
		const client = props.data.client;

		if (client && client.picture) {
			return {
				picture: client.picture,
				width: client.picture_params.width,
				height: client.picture_params.height,
			};
		}

		return null;
	});

	const name = computed(() => {
		return props.data.name;
	});

	const text = computed(() => {
		return props.data.text;
	});

	const textAdditional = computed(() => {
		return props.data.text_additional;
	});

	const services = computed(() => {
		return props.data.services;
	});

	const link = computed(() => {
		return props.data.link;
	});

	const videoReview = computed(() => {
		const data = props.data.video_review;
		const name = data?.link_name;
		const video = data?.video;

		if (name && video) {
			return {
				name,
				video,
			};
		}

		return null;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
