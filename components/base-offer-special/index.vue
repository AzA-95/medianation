<template>
	<section class="base-offer-special">
		<div class="inner">
			<div class="container">
				<div class="content">
					<h2 class="title">{{ title }}</h2>
					<div class="text">{{ text }}</div>
					<div class="prices">
						<div
							v-for="(item, index) in prices"
							:key="index"
							class="price-block"
						>
							<div class="price">{{ item.price }}</div>
							<div
								class="price-text"
								v-html="item.text"
							></div>
						</div>
					</div>
					<div class="sale-icon-mob"></div>
					<div class="buttons">
						<div class="btn">
							<BaseButton @click="onShowPopup">
								Оставить заявку
							</BaseButton>
						</div>
						<div class="btn">
							<BaseButton
								theme="sixth"
								@click="onScrollToForm"
							>
								Получить бесплатную консультацию
							</BaseButton>
						</div>
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
	import type { BaseOfferSpecialType } from './type';
	import { scrollTo } from '@/utils/ui';
	import BaseButton from '@/components/base-button';
	import ComercialPopup from '@/components/comercial-popup';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseOfferSpecialType>,
			required: true,
		},
	});

	const title = computed(() => {
		return props.data.title;
	});

	const text = computed(() => {
		return props.data.text;
	});

	const prices = computed(() => {
		return props.data.prices;
	});

	const isShowPopup = ref(false);

	const onShowPopup = () => {
		isShowPopup.value = true;
	};

	const onClosePopup = () => {
		isShowPopup.value = false;
	};

	const onScrollToForm = () => {
		scrollTo({
			to: '.js-the-footer-form__scroll-pos',
		});
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
