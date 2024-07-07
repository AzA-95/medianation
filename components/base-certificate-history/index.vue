<template>
	<div
		class="base-certificate-history"
		:class="[modifierClasses]"
	>
		<div class="photo">
			<img
				v-lazy
				:data-src="picture"
				:width="pictureParams.width"
				:height="pictureParams.height"
				alt="certificate"
			/>
		</div>
		<a
			:href="link"
			target="_blank"
			class="btn"
		>
			Читать историю
		</a>
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
		modifierClasses: {
			type: Array as PropType<'dark'[] | null>,
			default: null,
		},
	});

	const modifierClasses = computed(() => {
		return props.modifierClasses?.map((item) => {
			return `base-certificate-history_${item}`;
		});
	});

	const picture = computed(() => {
		return props.data.picture;
	});

	const pictureParams = computed(() => {
		return props.data.picture_params;
	});

	const link = computed(() => {
		return props.data.link;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
