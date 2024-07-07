<template>
	<div
		class="base-award-vertical"
		:class="[modifierClasses]"
	>
		<div
			class="photo"
			data-match-height="true"
			:style="`
				--img-width: ${pictureParams.width};
				--img-height: ${pictureParams.height};
			`"
		>
			<span :class="{ lazy: useLazyImage }">
				<img
					v-if="useLazyImage"
					v-lazy
					:data-src="picture"
					:width="pictureParams.width"
					:height="pictureParams.height"
					alt="icon"
				/>
				<img
					v-else
					:src="picture"
					:width="pictureParams.width"
					:height="pictureParams.height"
					alt="icon"
				/>
			</span>
		</div>
		<div class="desc">
			<div class="name">
				{{ name }}
			</div>
			<div class="text">{{ text }}</div>
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
		useLazyImage: {
			type: Boolean,
			default: true,
		},
		modifierClasses: {
			type: Array as PropType<
				('white' | 'small' | 'sm-fz-bigger')[] | null
			>,
			default: null,
		},
	});

	const modifierClasses = computed(() => {
		return props.modifierClasses?.map((item) => {
			return `base-award-vertical_${item}`;
		});
	});

	const picture = computed(() => {
		return props.data.picture;
	});

	const pictureParams = computed(() => {
		return props.data.picture_params;
	});

	const name = computed(() => {
		return props.data.name;
	});

	const text = computed(() => {
		return props.data.text;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
