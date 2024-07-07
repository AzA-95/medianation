<template>
	<section
		v-if="items"
		class="base-faq"
	>
		<div class="container">
			<h2 class="title">{{ title }}</h2>
			<div class="accordions">
				<div
					v-for="(item, index) in items"
					:key="index"
					class="accordion"
					:class="{ active: expands[index] }"
				>
					<div
						class="accordion-title"
						@click="toggleAccordion(index)"
					>
						{{ item.name }}
					</div>
					<div
						ref="accordionContenEls"
						class="accordion-content-wrap"
					>
						<div class="accordion-content">
							<div class="accordion-text">{{ item.text }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { ref, reactive, computed, onMounted } from 'vue';
	import type { BaseType } from './type';
	import { useWindowResizeAxisX } from '@/composables/use-window-resize-axis-x';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const title = computed(() => {
		return props.data.name;
	});

	const items = computed(() => {
		return props.data.items;
	});

	const expands: Record<number, boolean> = reactive({});

	const toggleAccordion = (index: number) => {
		expands[index] = !expands[index];
	};

	const accordionContenEls = ref<HTMLElement[]>();

	const setAccordionContentHeight = () => {
		accordionContenEls.value?.forEach((accordionContent) => {
			accordionContent.style.setProperty(
				'--max-height',
				`${accordionContent.scrollHeight}px`,
			);
		});
	};

	const windowResizeAxisX = useWindowResizeAxisX();

	onMounted(() => {
		document.fonts.ready.then(() => {
			setAccordionContentHeight();

			windowResizeAxisX(setAccordionContentHeight);
		});
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
