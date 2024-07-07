<template>
	<div class="base-certificate">
		<div
			class="photo"
			:style="`
				--img-width: ${pictureParams.width};
				--img-height: ${pictureParams.height};
			`"
		>
			<img
				v-lazy
				:data-src="picture"
				:width="pictureParams.width"
				:height="pictureParams.height"
				alt="certificate"
			/>
		</div>
		<a
			v-if="detailFileLink"
			:href="detailFileLink"
			target="_blank"
			class="full-link"
		></a>
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

	const pictureParams = computed(() => {
		return props.data.picture_params;
	});

	const detailFileLink = computed(() => {
		return props.data.detail_file;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
