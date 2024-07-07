<template>
	<section class="base-vertical-tabs-second">
		<BaseBlockTitle :is-dark="true">
			<h2>{{ title }}</h2>
		</BaseBlockTitle>
		<div class="block">
			<div class="container">
				<div class="row">
					<div class="col col_left">
						<div class="tabs">
							<div
								v-for="(tab, index) in items"
								:key="index"
								class="tab"
								:class="{ active: activeTabIndex === index }"
								@click="changeTabContent(index)"
							>
								<span>{{ index + 1 }}</span>
								{{ tab.name }}
							</div>
						</div>
					</div>
					<div class="col col_right">
						<div
							v-for="(tab, index) in items"
							:key="index"
							class="tab-block"
							:class="{ active: index === activeTabIndex }"
						>
							<div
								class="tab-toggle-btn"
								:class="{ active: activeTabIndexMob === index }"
								@click="toggleDropDown(index)"
							>
								<span class="index">{{ index + 1 }}</span>
								<span>{{ tab.name }}</span>
							</div>
							<div
								ref="tabContentWrapEls"
								class="tab-content-wrap"
								:class="{ active: activeTabIndexMob === index }"
							>
								<div class="tab-content">
									<div
										ref="tabContentEl"
										class="tab-content__inner"
										:class="{
											'without-title': !activeTab.caption,
										}"
									>
										<div
											v-if="activeTab.caption"
											class="content-title"
										>
											{{ activeTab.caption }}
										</div>
										<div
											class="content-text"
											v-html="activeTab.html"
										></div>
									</div>
									<div class="tab-content__bg">
										<img
											v-lazy
											:data-src="tab.picture"
										/>
									</div>
									<div
										v-if="activeTab.button_name"
										class="tab-content__btn"
									>
										<BaseButton
											:modifier-classes="[
												'without-default-hover',
											]"
											@click="onShowPopup"
										>
											{{ activeTab.button_name }}
										</BaseButton>
									</div>
								</div>
							</div>
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
	import { ref, computed, watch, onMounted } from 'vue';
	import type { BaseType } from './type';
	import { useWindowResizeAxisX } from '@/composables/use-window-resize-axis-x';
	import BaseBlockTitle from '@/components/base-block-title';
	import BaseButton from '@/components/base-button';
	import ComercialPopup from '@/components/comercial-popup';

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

	const activeTabIndex = ref(0);

	const changeTabContent = (index: number) => {
		activeTabIndex.value = index;
	};

	const activeTabIndexMob = ref<number | null>(null);

	const toggleDropDown = (index: number) => {
		activeTabIndexMob.value =
			activeTabIndexMob.value === index ? null : index;
	};

	const activeTab = computed(() => {
		return props.data.items[activeTabIndex.value];
	});

	const isShowPopup = ref(false);

	const onShowPopup = () => {
		isShowPopup.value = true;
	};

	const onClosePopup = () => {
		isShowPopup.value = false;
	};

	const tabContentEl = ref<HTMLElement>();

	const scrollToTopContent = () => {
		// Скроллим в верх контент при смене табов
		// Так как при скролле вниз, скролл остается на месте при смене контента у таба
		const content = tabContentEl.value;

		if (content) {
			content.scrollTop = 0;
		}
	};

	watch(activeTab, scrollToTopContent);

	const tabContentWrapEls = ref<HTMLElement[]>();

	const setMaxHeightToCssVar = () => {
		const isMob = window.innerWidth < 768;

		if (isMob) {
			tabContentWrapEls.value?.forEach((element) => {
				const height = element.scrollHeight;

				element.style.setProperty('--max-height', `${height}px`);
			});
		}
	};

	const windowResizeAxisX = useWindowResizeAxisX();

	onMounted(() => {
		setMaxHeightToCssVar();
		windowResizeAxisX(setMaxHeightToCssVar);
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
