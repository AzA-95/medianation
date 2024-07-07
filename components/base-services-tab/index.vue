<template>
	<section class="base-services-tab">
		<div class="container">
			<div class="head">
				<div class="top-col-left">
					<h2 class="title">{{ name }}</h2>
				</div>
				<div class="top-col-right">
					<div class="top-desc">{{ text }}</div>
				</div>
			</div>
			<div class="row">
				<div class="col-left">
					<div class="picture">
						<picture>
							<img
								v-lazy
								:data-src="picture"
								width="468"
								height="468"
								alt="pic"
							/>
						</picture>
					</div>
				</div>
				<div class="col-right">
					<div class="services">
						<div
							v-for="(item, index) in items"
							:key="index"
							class="service-tab"
							:class="{ active: activeTabIndex === index }"
						>
							<h3
								class="service-tab__title"
								@click="onToggleTab(index)"
							>
								<span>{{ item.name }}</span>
								<span class="service-tab__index">
									0{{ index + 1 }}
								</span>
							</h3>
							<div
								ref="tabContentEls"
								class="service-tab__content-wrap"
							>
								<div class="service-tab__content">
									<div
										v-if="item.menu"
										class="service-tab__list"
									>
										<div
											v-for="(
												menu, childIndex
											) in item.menu"
											:key="childIndex"
											class="service-tab__item"
										>
											<NuxtLink
												:to="menu.link"
												target="_blank"
												class="service-tab__link"
											>
												{{ menu.name }}
											</NuxtLink>
										</div>
									</div>
									<div
										v-if="item.awards || item.text"
										class="service-tab__awards-with-text"
									>
										<div
											v-if="item.awards"
											class="service-tab__awards"
										>
											<div
												v-for="(
													award, childIndex
												) in item.awards"
												:key="childIndex"
												class="service-tab__award"
											>
												<div
													class="service-tab__award-inner"
												>
													<BaseAward :data="award" />
												</div>
											</div>
										</div>
										<div
											v-if="item.text"
											class="service-tab__desc"
										>
											{{ item.text }}
										</div>
									</div>
									<div class="service-tab__bottom">
										<div
											v-if="item.price"
											class="service-tab__price"
										>
											{{ item.price }}
										</div>
										<NuxtLink
											:to="item.link"
											target="_blank"
											class="service-tab__detail"
										>
											Подробнее
										</NuxtLink>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="info">
						<div class="info__title">
							Не нашли подходящую услугу?
						</div>
						<div class="info__desc">
							<span @click="onShowPopup">Свяжитесь с нами</span>
							и мы поможем подобрать наиболее эффективный способ
							продвижения вашего бизнеса
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
	import { ref, computed, onMounted } from 'vue';
	import type { BaseServicesTabType } from './type';
	import { useEventListener } from '@/composables/use-event-listener';
	import BaseAward from '@/components/base-award';
	import ComercialPopup from '@/components/comercial-popup';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseServicesTabType>,
			required: true,
		},
	});

	const name = computed(() => {
		return props.data.name;
	});

	const text = computed(() => {
		return props.data.text;
	});

	const picture = computed(() => {
		return props.data.picture;
	});

	const items = computed(() => {
		return props.data.items;
	});

	const activeTabIndex = ref<number | null>(null);

	const onToggleTab = (index: number) => {
		if (activeTabIndex.value === index) {
			activeTabIndex.value = null;
			return;
		}

		activeTabIndex.value = index;
	};

	const tabContentEls = ref<HTMLElement[]>();

	const setTabContentHeight = () => {
		const elements = tabContentEls.value;

		if (elements?.length) {
			elements.forEach((tabContent) => {
				tabContent.style.setProperty(
					'--max-height',
					`${tabContent.scrollHeight}px`,
				);
			});
		}
	};

	const isShowPopup = ref(false);

	const onShowPopup = () => {
		isShowPopup.value = true;
	};

	const onClosePopup = () => {
		isShowPopup.value = false;
	};

	const eventListener = useEventListener();

	onMounted(() => {
		setTabContentHeight();

		eventListener(window, 'resize', setTabContentHeight);
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
