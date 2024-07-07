<template>
	<section class="base-vertical-tabs">
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
					<div
						class="col col_right"
						:style="{
							'background-image': `url('${activeTab.picture}')`,
						}"
					>
						<div
							class="tab-content"
							:class="{ 'without-title': !activeTab.caption }"
						>
							<div
								ref="tabContentEl"
								class="tab-content__inner"
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
		<ComercialPopup
			:show="isShowPopup"
			@close="onClosePopup"
		/>
	</section>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { ref, computed, watch } from 'vue';
	import type { BaseType } from './type';
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
</script>

<style scoped lang="scss" src="./style.scss"></style>
