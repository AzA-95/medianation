<template>
	<div
		id="base-adindex-description"
		class="base-adindex-description"
	>
		<div class="container">
			<div class="row">
				<div class="logo">
					<img
						v-lazy
						:data-src="logo"
						alt="logo"
					/>
				</div>
				<div class="text">{{ text }}</div>
			</div>
			<div
				ref="slidingTextWrapEl"
				class="sliding-text-wrap"
			>
				<div
					ref="slidingTextEl"
					class="sliding-text"
				>
					{{ bottomText }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { ref, computed, onMounted } from 'vue';
	import logo from './images/logo.svg';
	import type { BaseType } from './type';
	import { useMediaQuery } from '@/composables/use-media-query';
	import { useEventListener } from '@/composables/use-event-listener';
	import { useWindowResizeAxisX } from '@/composables/use-window-resize-axis-x';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const text = computed(() => {
		return props.data.text;
	});

	const bottomText = computed(() => {
		return props.data.bottom_text;
	});

	const slidingTextEl = ref<HTMLElement>();
	const slidingTextWrapEl = ref<HTMLElement>();
	const mediaQuery = useMediaQuery();
	const eventListener = useEventListener();
	const windowResizeAxisX = useWindowResizeAxisX();

	const getScrollFraction = (startTop: number, endTop: number) => {
		const scrollTop = window.scrollY;

		if (startTop > scrollTop) return 0;

		return (scrollTop - startTop) / (endTop - startTop);
	};

	const wrapToChars = () => {
		const slidingText = slidingTextEl.value!;
		const words = slidingText.textContent!.trim().split(' ');

		slidingText.innerHTML = ''; // remove default content

		words.forEach((word, index) => {
			let content = '';

			word.split('').forEach((letter) => {
				content += `<span class="char">${letter}</span>`;
			});

			if (index !== words.length - 1) {
				content += ' '; // adding space bettween words
			}

			slidingText.innerHTML += `${content}`;
		});
	};

	const getChars = () => {
		return slidingTextWrapEl.value!.querySelectorAll('.char');
	};

	const setHeightToCssVar = () => {
		slidingTextWrapEl.value!.style.setProperty(
			'--height',
			`${slidingTextEl.value!.offsetHeight}px`,
		);
	};

	const getHeightOfText = () => {
		return slidingTextWrapEl.value!.offsetHeight;
	};

	const initScrollTextLine = () => {
		const slidingText = slidingTextEl.value;
		const slidingTextWrap = slidingTextWrapEl.value;

		if (slidingText && slidingText.textContent && slidingTextWrap) {
			wrapToChars();
			setHeightToCssVar();
			const chars = getChars();
			let heightOfText = getHeightOfText();

			windowResizeAxisX(() => {
				setHeightToCssVar();
				heightOfText = getHeightOfText();
			});

			const callback = () => {
				const top = Math.floor(
					slidingTextWrap.getBoundingClientRect().top +
						window.scrollY,
				);
				const startTop = top - window.innerHeight * 0.5;
				const endTop = top + heightOfText - window.innerHeight;
				const activeCountLetters =
					getScrollFraction(startTop, endTop) * chars.length;

				chars.forEach((char, index) => {
					if (activeCountLetters > index) {
						char.classList.add('active');
					} else {
						char.classList.remove('active');
					}
				});
			};

			mediaQuery('(min-width: 767px)', (matches) => {
				let destroyEvent = () => {};

				if (matches) {
					callback();

					destroyEvent = eventListener(window, 'scroll', callback, {
						passive: true,
					});
				} else {
					destroyEvent();
				}
			});
		}
	};

	onMounted(() => {
		initScrollTextLine();
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
