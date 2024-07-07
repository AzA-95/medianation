<template>
	<section class="base-banner-service-with-text-center">
		<div class="bg">
			<img
				:src="background"
				alt="background"
			/>
		</div>
		<div class="container">
			<div class="breadcrumbs">
				<BaseBreadcrumbs
					:breadcrumbs="breadcrumbs"
					:modifier-classes="['white']"
				/>
			</div>
			<div class="inner">
				<div class="content">
					<h1
						class="title"
						v-html="title"
					></h1>
					<div class="picture">
						<img
							:src="picture"
							alt="picture"
						/>
					</div>

					<div class="bottom">
						<div class="price">
							<div class="price__value">{{ price }}</div>
							<div class="price__text">{{ priceText }}</div>
						</div>
						<div class="btn">
							<BaseButton @click="onShowPopup">
								{{ btnName }}
							</BaseButton>
						</div>
					</div>
				</div>

				<div class="circle-icon">
					<BaseCircleRotatedIcon />
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
	import BaseBreadcrumbs from '@/components/base-breadcrumbs';
	import BaseButton from '@/components/base-button';
	import BaseCircleRotatedIcon from '@/components/base-circle-rotated-icon';
	import ComercialPopup from '@/components/comercial-popup';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const background = computed(() => {
		return props.data.background;
	});

	const breadcrumbs = computed(() => {
		return props.data.breadcrumbs;
	});

	const title = computed(() => {
		return props.data.title;
	});

	const picture = computed(() => {
		return props.data.picture;
	});

	const price = computed(() => {
		return props.data.price;
	});

	const priceText = computed(() => {
		return props.data.price_text;
	});

	const btnName = computed(() => {
		return props.data.button_name;
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
