<template>
	<section class="base-banner-desc">
		<div class="bg">
			<img
				:src="picture"
				alt="background"
			/>
		</div>
		<div class="container">
			<div class="inner">
				<h1 class="title">{{ title }}</h1>
				<div class="text">{{ text }}</div>
				<div class="btn">
					<BaseButton @click="onShowPopup">
						Оставить заявку
					</BaseButton>
				</div>

				<div class="circle-icon">
					<BaseCircleRotatedIcon :modifier-classes="['light']" />
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
	import BaseButton from '@/components/base-button';
	import BaseCircleRotatedIcon from '@/components/base-circle-rotated-icon';
	import ComercialPopup from '@/components/comercial-popup';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const picture = computed(() => {
		return props.data.picture;
	});

	const title = computed(() => {
		return props.data.title;
	});

	const text = computed(() => {
		return props.data.text;
	});

	const isShowPopup = ref(false);

	const onShowPopup = () => {
		isShowPopup.value = true;
	};

	const onClosePopup = () => {
		isShowPopup.value = false;
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
