<template>
	<section class="base-tariffs-small-grid">
		<div class="container">
			<h2 class="title">{{ title }}</h2>
			<div class="tariffs">
				<div
					v-for="(item, index) in items"
					:key="index"
					class="tariff js-tariff"
					:class="{ active: activeIndex === index }"
					@mouseenter="resetActiveIndex"
					@mouseleave="setActiveIndex"
				>
					<div class="tariff__name">{{ item.name }}</div>
					<div class="tariff__price">{{ item.price }}</div>
					<div class="tariff__bottom">
						<div
							v-if="item.columns"
							class="tariff__info-column"
						>
							<div class="tariff__info-title">
								{{ item.columns[0].info_tite }}
							</div>
							<div class="tariff__info-text">
								{{ item.columns[0].info_text }}
							</div>
						</div>
						<div class="tariff__btns">
							<div class="tariff__btn">
								<BaseButton @click="onScrollToForm">
									Оставить заявку
								</BaseButton>
							</div>
							<div class="tariff__btn tariff__btn_detail">
								<BaseButton
									theme="fourth"
									@click="onShowPopup(item)"
								>
									Подробнее
								</BaseButton>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<BaseTariffPopup
			v-if="isShowPopup && popupData"
			:data="popupData"
			@close="onClosePopup"
		/>
	</section>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { ref, computed } from 'vue';
	import type { BaseType } from './type';
	import { scrollTo } from '@/utils/ui';
	import BaseButton from '@/components/base-button';
	import BaseTariffPopup from '@/components/base-tariff-popup';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const title = computed(() => {
		return props.data.title;
	});

	const items = computed(() => {
		return props.data.items;
	});

	const onScrollToForm = () => {
		scrollTo({
			to: '.js-the-footer-form__scroll-pos',
		});
	};

	const isShowPopup = ref(false);
	const popupData = ref<BaseType['items'][0] | null>(null);

	const onShowPopup = (data: BaseType['items'][0]) => {
		popupData.value = data;
		isShowPopup.value = true;
	};

	const onClosePopup = () => {
		isShowPopup.value = false;
	};

	const activeIndex = ref<number | null>(0);

	const setActiveIndex = (e: MouseEvent) => {
		if (
			e.relatedTarget === null ||
			!(e.relatedTarget as HTMLElement).closest('.js-tariff')
		) {
			activeIndex.value = 0;
		}
	};

	const resetActiveIndex = () => {
		activeIndex.value = null;
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
