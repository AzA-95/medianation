<template>
	<section
		ref="promoTextEl"
		class="base-main-promo-text"
	>
		<div class="inner">
			<div class="desc">
				<h1 class="title">
					<span
						ref="lineTextTopEl"
						class="line-text line-text_first"
					>
						<span class="big-text">{{ titles.firstLineWord }}</span>
					</span>
					<span
						ref="lineTextMiddleEl"
						class="line-text line-text_second"
					>
						<span class="middle-text">
							<span class="big-text">
								{{ titles.secondLineWord }}
							</span>
							<span class="small-text hide-md">{{ text }}</span>
						</span>
					</span>
					<span
						ref="lineTextBottomEl"
						class="line-text line-text_third"
					>
						<span class="big-text">{{ titles.thirdLineWord }}</span>
					</span>
					<span class="line-text line-text_fourth hide-md-min">
						<span class="small-text">{{ text }}</span>
					</span>
				</h1>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { ref, computed, onMounted } from 'vue';
	import type { BaseType } from './type';
	import { useEventListener } from '@/composables/use-event-listener';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const titles = computed(() => {
		const words = props.data.title.split(' ');

		return {
			firstLineWord: words[0],
			secondLineWord: words[1],
			thirdLineWord: words[2],
		};
	});

	const text = computed(() => {
		return props.data.text;
	});

	const moveElement = (element: HTMLElement, position: number) => {
		element.style.transform = `translateX(${position}px)`;
	};

	const eventListener = useEventListener();
	const promoTextEl = ref<HTMLElement>();
	const lineTextTopEl = ref<HTMLElement>();
	const lineTextMiddleEl = ref<HTMLElement>();
	const lineTextBottomEl = ref<HTMLElement>();

	onMounted(() => {
		if (
			promoTextEl.value &&
			lineTextTopEl.value &&
			lineTextMiddleEl.value &&
			lineTextBottomEl.value
		) {
			// Увеличиваем на 2 чтобы анимация срабатывала по раньше
			const promoTextHeight = promoTextEl.value.offsetHeight * 2;

			const callback = () => {
				const scrollPos = window.scrollY;

				if (promoTextHeight > scrollPos) {
					window.requestAnimationFrame(() => {
						moveElement(lineTextTopEl.value!, scrollPos * -0.3);
						moveElement(lineTextMiddleEl.value!, scrollPos * 0.4);
						moveElement(lineTextBottomEl.value!, scrollPos * -0.3);
					});
				}
			};

			eventListener(window, 'scroll', callback, { passive: true });
		}
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
