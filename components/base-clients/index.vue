<template>
	<div class="base-clients">
		<div class="container">
			<div
				class="close"
				:class="{ active: showCloseBtn }"
				@click="onClose"
			></div>
			<div
				class="row"
				:class="{ hovered: isChildHovered }"
			>
				<div
					v-for="(item, index) in items"
					:key="index"
					v-animate
					class="client"
					:class="{
						hovered: hoveredItemIndex === index,
					}"
					:data-animate="isDesktop ? 'scale-up' : null"
					@click="onShow(index)"
					@mouseenter="onHover(index)"
					@mouseleave="onHoverLeave"
				>
					<div
						class="client__logo"
						:style="`
							--img-width: ${item.picture_params.width};
							--img-height: ${item.picture_params.height};
						`"
					>
						<img
							v-lazy
							:data-src="item.picture"
							:width="item.picture_params.width"
							:height="item.picture_params.height"
							alt="client"
						/>
					</div>
					<div
						class="tooltip-client"
						:class="{
							active: activeIndex === index,
							'has-cases': item.cases && item.cases.length,
						}"
					>
						<div
							class="tooltip-client__logo"
							:style="`
								--img-width: ${item.picture_params.width};
								--img-height: ${item.picture_params.height};
							`"
						>
							<img
								v-lazy
								:data-src="item.picture"
								:width="item.picture_params.width"
								:height="item.picture_params.height"
								alt="client"
							/>
						</div>
						<div
							v-if="item.cases && item.cases.length"
							class="tooltip-client__cases"
						>
							<div
								v-for="(childItem, childIndex) in item.cases"
								:key="childIndex"
								class="tooltip-client__case"
							>
								<NuxtLink
									:to="childItem.link"
									class="tooltip-client__link"
								>
									{{ childItem.name }}
								</NuxtLink>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { ref, computed, onMounted } from 'vue';
	import type { BaseType } from './type';
	import { useTimeout } from '@/composables/use-timeout';
	import { useMediaQuery } from '@/composables/use-media-query';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const items = computed(() => {
		return props.data.items;
	});

	const activeIndex = ref<number | null>(null);
	const showCloseBtn = ref(false);

	const onShow = (index: number) => {
		if (window.innerWidth > 767) return;

		activeIndex.value = index;
		showCloseBtn.value = true;
		document.body.classList.add('clients-logo-opened');
	};

	const onClose = () => {
		activeIndex.value = null;
		showCloseBtn.value = false;
		document.body.classList.remove('clients-logo-opened');
	};

	const isChildHovered = ref(false);
	const hoveredItemIndex = ref<number | null>(null);

	const onHover = (index: number) => {
		isChildHovered.value = true;
		hoveredItemIndex.value = index;
	};

	let destroyTimeout = () => {};
	const timeout = useTimeout();
	const lastHoveredItemIndex = ref<number | null>(null);

	const onHoverLeave = () => {
		lastHoveredItemIndex.value = hoveredItemIndex.value;

		// Предотврашаем блики при резком ховере на другой логотип
		destroyTimeout();

		destroyTimeout = timeout(() => {
			if (lastHoveredItemIndex.value !== hoveredItemIndex.value) return;
			isChildHovered.value = false;
			hoveredItemIndex.value = null;
		}, 200);
	};

	const isDesktop = ref(false);
	const mediaQuery = useMediaQuery();

	onMounted(() => {
		mediaQuery('(min-width: 1280px)', (matches) => {
			isDesktop.value = matches;
		});
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
