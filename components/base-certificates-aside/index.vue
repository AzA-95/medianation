<template>
	<div
		ref="asideEl"
		class="base-certificates-aside"
	>
		<div
			:ref="(el) => advantageEls.push(el as HTMLElement)"
			class="advantage"
		>
			<div class="counter">
				>
				<span :ref="(el) => counterEls.push(el as HTMLElement)">
					100
				</span>
			</div>
			Сотрудников
		</div>
		<div
			:ref="(el) => advantageEls.push(el as HTMLElement)"
			class="advantage"
		>
			<div class="counter">
				<span :ref="(el) => counterEls.push(el as HTMLElement)">
					15
				</span>
				<i>лет</i>
			</div>
			экспертизы
		</div>
		<div
			:ref="(el) => advantageEls.push(el as HTMLElement)"
			class="advantage"
		>
			<div class="counter">
				<span :ref="(el) => counterEls.push(el as HTMLElement)">
					1.6
				</span>
				<small>млрд</small>
				<span class="rub">₽</span>
			</div>
			Рекламных бюджетов
		</div>
		<div
			:ref="(el) => advantageEls.push(el as HTMLElement)"
			class="advantage"
		>
			<div class="counter">
				<span :ref="(el) => counterEls.push(el as HTMLElement)">
					275
				</span>
			</div>
			Активных клиентов
			<span class="color">324 всего</span>
		</div>
		<div
			:ref="(el) => advantageEls.push(el as HTMLElement)"
			class="advantage"
		>
			<div class="counter">
				<span :ref="(el) => counterEls.push(el as HTMLElement)">
					273
				</span>
			</div>
			Сертификата
		</div>
		<div
			:ref="(el) => advantageEls.push(el as HTMLElement)"
			class="advantage"
		>
			<div class="counter">
				<span :ref="(el) => counterEls.push(el as HTMLElement)">2</span>
			</div>
			<div class="text-city">
				Офиса в
				<img
					v-lazy
					:data-src="mskIcon"
					alt="icon"
				/>
				Москве
				<br />
				и в
				<img
					v-lazy
					:data-src="nnIcon"
					alt="icon"
				/>
				Нижнем Новгороде
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { CountUp } from 'countup.js';
	import { ref, onMounted } from 'vue';
	import mskIcon from './images/msk.svg';
	import nnIcon from './images/nn.svg';
	import { useEventListener } from '@/composables/use-event-listener';
	import { useWindowResizeAxisX } from '@/composables/use-window-resize-axis-x';

	const asideEl = ref<HTMLElement>();
	const counterEls = ref<HTMLElement[]>([]);
	const advantageEls = ref<HTMLElement[]>([]);
	const eventListener = useEventListener();
	const windowResizeAxisX = useWindowResizeAxisX();

	onMounted(() => {
		const aside = asideEl.value;
		const advantages = advantageEls.value;

		if (aside && advantages.length) {
			counterEls.value.forEach((counterEl) => {
				const text = counterEl.textContent as string;
				const splitedText = text.split('.');
				const decimalLength =
					splitedText.length === 2 ? splitedText[1].trim().length : 0;
				const value = parseFloat(text);

				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const countUp = new CountUp(counterEl, value, {
					duration: 1,
					decimalPlaces: decimalLength,
					enableScrollSpy: true,
					scrollSpyOnce: true,
				});
			});

			const getHeight = (el: HTMLElement) => {
				const top = parseInt(
					window.getComputedStyle(el).getPropertyValue('padding-top'),
				);
				const bottom = parseInt(
					window
						.getComputedStyle(el)
						.getPropertyValue('padding-bottom'),
				);

				return el.clientHeight - top - bottom;
			};

			const getPositions = (countEls: number, parentHeight: number) => {
				const position = parentHeight / countEls;

				return Array.from({ length: countEls }, (_, index) => {
					return position * (index + 1);
				});
			};

			let asideHeight = getHeight(aside);
			let positions = getPositions(advantages.length, asideHeight);

			windowResizeAxisX(() => {
				asideHeight = getHeight(aside);
				positions = getPositions(advantages.length, asideHeight);
			});

			eventListener(
				window,
				'scroll',
				() => {
					const top = aside.getBoundingClientRect().top;
					const startTop = top - 260;
					const topAbs = Math.abs(top);

					if (startTop < 0 && asideHeight > topAbs) {
						let isExecuted = false;

						for (let i = 0; i < positions.length; i++) {
							const el = advantages[i];
							const position = positions[i];

							if (position > topAbs && isExecuted === false) {
								isExecuted = true;
								el.classList.add('active');
							} else {
								el.classList.remove('active');
							}
						}
					}
				},
				{ passive: true },
			);
		}
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
