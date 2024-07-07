<template>
	<section class="base-adindex-banner">
		<div class="container">
			<div class="row">
				<div class="desc">
					<h1 class="title">{{ title }}</h1>
					<div class="text">{{ text }}</div>
					<div class="circle-icon">
						<BaseCircleRotatedIcon />
					</div>
				</div>
				<div class="pic">
					<picture>
						<source
							media="(max-width: 500)"
							:srcset="pictureMob"
						/>
						<img
							:src="picture"
							alt="rating"
						/>
					</picture>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';
	import type { BaseType } from './type';
	import BaseCircleRotatedIcon from '@/components/base-circle-rotated-icon';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const title = computed(() => {
		return props.data.title;
	});

	const text = computed(() => {
		return props.data.text;
	});

	const picture = computed(() => {
		return props.data.picture;
	});

	const pictureMob = computed(() => {
		return props.data.picture_mob;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
