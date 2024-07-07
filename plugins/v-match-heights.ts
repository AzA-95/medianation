import type { Directive } from 'vue';
import { defineNuxtPlugin } from 'nuxt/app';
import { getOffsetTop } from '@/utils/ui';

// Прежде чем писать свою реализацию попробовал исполбзовать этот плагин https://github.com/MorevM/equal-heights
// Но он не учитывает позицию элемента с transform(смотри анимацию компонента base-team) поэтому написал свою реализацию
const windowResizeAxisX = (callback: () => void) => {
	let prevWindowWidth = window.innerWidth;
	const cb = () => {
		if (prevWindowWidth !== window.innerWidth) {
			prevWindowWidth = window.innerWidth;
			callback();
		}
	};

	window.addEventListener('resize', cb);

	return () => {
		window.removeEventListener('resize', cb);
	};
};

type OptionsType = {
	selectors: string[];
	isEnabled?: (arg: Window) => boolean;
};

class MatchHeight {
	private resizeEventListener: null | (() => void) = null;
	private mutationObserverInstance: null | MutationObserver = null;
	private elementsStore = new Map<string, HTMLElement[]>();

	private defaultOptions: OptionsType = {
		selectors: ['[data-match-height]'],
		isEnabled: () => true,
	};

	constructor(el: HTMLElement, options: OptionsType) {
		const normalizedOptions = this.normalizeOptions(options);

		this.init(el, normalizedOptions);
	}

	private normalizeOptions(options: OptionsType) {
		return {
			...this.defaultOptions,
			...options,
		} as Required<OptionsType>;
	}

	private removeHeights(elements: HTMLElement[]) {
		elements.forEach((element) => {
			element.style.minHeight = '';
		});
	}

	private setHeights(elements: HTMLElement[]) {
		const items = new Map<
			string,
			{ items: HTMLElement[]; height: number }
		>();
		let uId = 0;
		let prevTop = 0;
		let prevBottom = 0;
		let maxHeight = 0;

		elements.forEach((element, index) => {
			const isFirstInterate = index === 0;
			// Сделал без getBoundingClientRect (Чтобы коректно учитывал положение элмента даже с transfrom
			// для подробностей смотри анимацию компонента base-team)
			const height = element.offsetHeight;
			const top = getOffsetTop(element);
			const bottom = top + height;

			// bottom нужен чтобы определять коректно нижнюю позицию элемента если элемент позицианируется с
			// (position: absolute; bottom: значение пикселей;) для подробностей смотри (имя авторов у компонента base-team)
			if (isFirstInterate || top === prevTop || bottom === prevBottom) {
				if (height > maxHeight) {
					maxHeight = height;
				}
			} else {
				uId++;
				maxHeight = height;
			}

			const key = `${uId}`;

			if (!items.has(key)) {
				items.set(key, {
					items: [element],
					height: maxHeight,
				});
			} else {
				items.get(key)!.items.push(element);
				items.get(key)!.height = maxHeight;
			}

			prevTop = top;
			prevBottom = bottom;
		});

		items.forEach((value) => {
			value.items.forEach((item) => {
				item.style.minHeight = `${value.height}px`;
			});
		});
	}

	private update(elements: HTMLElement[]) {
		this.removeHeights(elements);
		this.setHeights(elements);
	}

	private setSelectorsToStore(el: HTMLElement, selectors: string[]) {
		selectors.forEach((selector) => {
			this.elementsStore.set(
				selector,
				Array.from(el.querySelectorAll(selector)),
			);
		});
	}

	private observer(
		el: HTMLElement,
		selectors: string[],
		isEnabled: (arg: Window) => boolean,
	) {
		// Следим за дочерними изменениями так как хук updated не будет вызываться при дочерних изменений
		const observer = new MutationObserver(() => {
			if (isEnabled(window)) {
				this.setSelectorsToStore(el, selectors); // update list of elements

				this.elementsStore.forEach((value) => {
					this.update(value);
				});
			}
		});

		observer.observe(el, {
			childList: true,
			subtree: true,
		});

		this.mutationObserverInstance = observer;
	}

	private init(el: HTMLElement, options: Required<OptionsType>) {
		const selectors = options.selectors;
		const isEnabled = options.isEnabled;

		this.observer(el, selectors, isEnabled);

		this.resizeEventListener = windowResizeAxisX(() => {
			this.elementsStore.forEach((value) => {
				isEnabled(window)
					? this.update(value)
					: this.removeHeights(value);
			});
		});

		if (isEnabled(window)) {
			this.setSelectorsToStore(el, selectors);

			this.elementsStore.forEach((value) => {
				this.setHeights(value);
			});
		}
	}

	public destroy() {
		this.resizeEventListener!();
		this.mutationObserverInstance!.disconnect();
		this.elementsStore.clear();
	}
}

const store = new WeakMap<HTMLElement, InstanceType<typeof MatchHeight>>();

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive('match-height', <
		Directive<HTMLElement, OptionsType>
	>{
		mounted(el: HTMLElement, binding) {
			const matchHeight = new MatchHeight(el, binding.value);
			store.set(el, matchHeight);
		},
		beforeUnmount(el: HTMLElement) {
			const matchHeight = store.get(el);
			matchHeight?.destroy();
		},
	});
});
