<template>
	<header
		ref="mainEl"
		class="base-header-land"
	>
		<div class="container">
			<div class="row">
				<div class="left">
					<div class="logo">
						<a
							href="https://medianation.ru/"
							target="_blank"
						>
							<img
								:src="logo"
								alt="logo"
							/>
						</a>
					</div>
				</div>
				<div class="right">
					<div class="menu">
						<a
							v-for="(item, index) in menu"
							:key="index"
							:href="item.href"
							class="menu__link"
							@click="onScrollTo($event, `${item.href}`)"
						>
							{{ item.name }}
						</a>
					</div>
					<div class="btn">
						<BaseButton
							theme="third"
							@click="onScrollToForm"
						>
							Связаться с нами
						</BaseButton>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { ref, computed, onMounted } from 'vue';
	import logo from './images/logo.svg';
	import type { BaseType, ElementType } from './type';
	import { scrollTo } from '@/utils/ui';
	import { useWindowResizeAxisX } from '@/composables/use-window-resize-axis-x';
	import BaseButton from '@/components/base-button';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const menu = computed(() => {
		return props.data.menu;
	});

	const fixedTop = ref(0);

	const onScrollTo = (event: Event, href: string) => {
		event.preventDefault();

		scrollTo({
			to: href,
			top: -fixedTop.value,
		});
	};

	const onScrollToForm = (event: Event) => {
		onScrollTo(event, '.js-the-footer-form__scroll-pos');
	};

	const mainEl = ref<HTMLElement>();

	const windowResizeAxisX = useWindowResizeAxisX();

	onMounted(() => {
		const element = mainEl.value;

		if (element) {
			const setHeight = () => {
				const height = element.offsetHeight;
				fixedTop.value = height;
			};

			setHeight();

			windowResizeAxisX(setHeight);
		}
	});

	defineExpose<ElementType>({
		element: mainEl,
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
