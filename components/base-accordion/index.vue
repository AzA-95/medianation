<template>
	<div class="base-accordion">
		<div
			class="title"
			:class="{ active: isActive }"
			@click="onToggleAccordion"
		>
			{{ title }}
		</div>
		<div
			ref="accordionContentEl"
			class="content-wrapper"
			:class="{ active: isActive }"
		>
			<div class="content">
				<div
					class="text"
					v-html="text"
				></div>
				<div
					v-if="showErrorText"
					class="error-text"
				>
					Заметили ошибку?
					<span @click="onScrollToForm">Напишите</span>
					нам, мы исправим
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { ref, computed, onMounted } from 'vue';
	import type { BaseType } from './type';
	import { scrollTo } from '@/utils/ui';
	import { useWindowResizeAxisX } from '@/composables/use-window-resize-axis-x';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
		showErrorText: {
			type: Boolean,
			default: false,
		},
	});

	const title = computed(() => {
		return props.data.name;
	});

	const text = computed(() => {
		return props.data.text;
	});

	const showErrorText = computed(() => {
		return props.showErrorText;
	});

	const isActive = ref(false);

	const onToggleAccordion = () => {
		isActive.value = !isActive.value;
	};

	const onScrollToForm = () => {
		scrollTo({
			to: '.js-the-footer-form__scroll-pos',
		});
	};

	const accordionContentEl = ref<HTMLElement>();
	const windowResizeAxisX = useWindowResizeAxisX();

	const setAccordionContentHeight = () => {
		const el = accordionContentEl.value;

		if (el) {
			el.style.setProperty('--max-height', `${el.scrollHeight}px`);
		}
	};

	onMounted(() => {
		setAccordionContentHeight();
		windowResizeAxisX(setAccordionContentHeight);
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
