<template>
	<section class="base-review">
		<div class="row">
			<div class="left">
				<h3
					v-if="title"
					class="title"
				>
					{{ title }}
				</h3>
				<div class="rating">
					<div class="rating__row">
						<div class="rating__stars">
							<template
								v-for="(item, index) in ratingIconsState"
								:key="index"
							>
								<i
									:class="[
										item.active
											? 'rating__star-active'
											: 'rating__star-inactive',
									]"
								></i>
							</template>
						</div>
						<div class="rating__grade">{{ rating }} из 5</div>
					</div>
				</div>
				<div class="text">{{ text }}</div>

				<div
					v-if="fileData"
					class="file"
				>
					<BaseFile :data="fileData" />
				</div>
			</div>
			<div class="right">
				<div class="client">
					<div
						class="client__logo"
						:style="`
							--img-width: ${client.picture_params.width};
							--img-height: ${client.picture_params.height};
						`"
					>
						<a
							v-if="client.link"
							:href="client.link"
							target="_blank"
						>
							<img
								v-lazy="{ rootMargin: '100%' }"
								:data-src="client.picture"
								:width="client.picture_params?.width"
								:height="client.picture_params?.height"
								alt="logo"
							/>
						</a>
						<span v-else>
							<img
								v-lazy
								:data-src="client.picture"
								:width="client.picture_params?.width"
								:height="client.picture_params?.height"
								alt="logo"
							/>
						</span>
					</div>

					<a
						v-if="client.link"
						:href="client.link"
						target="_blank"
						class="client__name"
					>
						{{ client.name }}
					</a>
					<div
						v-else
						class="client__name"
					>
						{{ client.name }}
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';
	import type { BaseReviewType } from './type';
	import BaseFile from '@/components/base-file';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseReviewType>,
			required: true,
		},
	});

	const title = computed(() => {
		return props.data.name;
	});

	const rating = computed(() => {
		return props.data.rating;
	});

	const ratingIconsState = computed(() => {
		const defaultRating = Array(5).fill({ inactive: true });

		return defaultRating.fill({ active: true }, 0, rating.value);
	});

	const text = computed(() => {
		return props.data.text;
	});

	const client = computed(() => {
		// fix extrenal me link
		return props.data.client;
	});

	const author = computed(() => {
		return props.data.author;
	});

	const file = computed(() => {
		return props.data.file;
	});

	const fileData = computed(() => {
		if (file.value && author.value) {
			return {
				name: author.value.name,
				position: author.value.position,
				fileLink: file.value,
			};
		}

		return null;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
