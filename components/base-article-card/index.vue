<template>
	<div
		class="base-article-card"
		:class="[showType]"
	>
		<div class="photo">
			<img
				v-lazy
				:data-src="picture"
				alt="picture"
			/>
		</div>
		<div class="content">
			<div class="info">
				<span class="date">{{ date }}</span>
				<span
					v-if="showCount"
					class="watched"
				>
					{{ showCount }}
				</span>
				<span
					v-if="readingTime"
					class="read-time"
				>
					{{ readingTime }}
				</span>
			</div>
			<div class="tags">
				<span
					v-for="(tag, childIndex) in tags"
					:key="childIndex"
					class="tag"
				>
					#{{ tag }}
				</span>
			</div>
			<NuxtLink
				:to="link"
				class="name"
			>
				{{ name }}
			</NuxtLink>
			<div
				v-if="text && showType !== 'small'"
				class="text"
			>
				{{ text }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';
	import type { BaseType } from './type';
	import { rusWordEnding } from '@/utils/common';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const showType = computed(() => {
		return props.data.show_type;
	});

	const picture = computed(() => {
		return props.data.picture;
	});

	const date = computed(() => {
		return props.data.date;
	});

	const showCount = computed(() => {
		const count = props.data.show_count;

		if (count) {
			const text = rusWordEnding(
				count,
				'просмотр',
				'просмотра',
				'просмотров',
			);

			return `${count} ${text}`;
		}

		return null;
	});

	const readingTime = computed(() => {
		return props.data.reading_time;
	});

	const tags = computed(() => {
		return props.data.tags;
	});

	const name = computed(() => {
		return props.data.name;
	});

	const text = computed(() => {
		return props.data.text;
	});

	const link = computed(() => {
		return props.data.link;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
