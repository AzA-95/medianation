import type { Directive } from 'vue';
import { defineNuxtPlugin } from 'nuxt/app';

type OptionsType = {
	rootMargin?: string;
};

// При желании можно доработать для audio, iframe тегов
// Код не отрефакторинг все в одной куче
// TODO refactor me
class LazyLoad {
	private lazyAtributeName = 'data-lazy';
	private loadingStates = {
		LOADING: 'loading',
		LOADED: 'loaded',
		ERROR: 'error',
	};

	private listeners: {
		el: HTMLElement;
		name: string;
		callback: (e: Event) => void;
	}[] = [];

	private observerInstance: null | IntersectionObserver = null;
	private prevSrcOfImage;
	private el: HTMLElement;
	private defaultOptions: Required<OptionsType> = {
		rootMargin: '50%',
	};

	constructor(el: HTMLElement, options: OptionsType) {
		const normalizedOptions = this.normalizeOptions(el, options);

		this.el = el;
		this.prevSrcOfImage = el.dataset.src || el.dataset.bg;
		this.init(el, normalizedOptions);
	}

	private normalizeOptions(el: HTMLElement, options?: OptionsType) {
		// [data-lazy-parent] нужен чтобы работал rootMargin если родитель имеет overflow
		// нужен в основном в слайдерах и т.д где контент скрыт от виевпорта(по ширине и т.д)
		// можно было бы использовать scrollMargin но он еще хорошо не подерживается
		// Также можно было бы использовать атрибут loading="lazy" но в сафари пока что хорошо не подерживается
		// Чтобы не передавать каждомой директив v-lazy прописал жестко сдесь data-lazy-parent
		const root = el.closest('[data-lazy-parent]');

		return { ...this.defaultOptions, ...options, root };
	}

	private isHasImgOrMedia(el: HTMLElement) {
		const parentTag = el.parentElement as HTMLElement;

		if (
			this.isImgTag(el) ||
			this.isMediaTag(el) ||
			this.isMediaTag(parentTag) ||
			this.isBackgroundEl(el)
		) {
			return true;
		}

		return false;
	}

	private isBackgroundEl(el: HTMLElement) {
		return el.getAttribute('data-bg') || false;
	}

	private isImgTag(el: HTMLElement) {
		return el.matches('img');
	}

	private isPictureTag(el: HTMLElement) {
		return el.matches('picture');
	}

	private isMediaTag(el: HTMLElement) {
		return el.matches('video');
	}

	private setLoadingState(
		el: HTMLElement,
		state: keyof typeof this.loadingStates,
	) {
		const keyName = this.lazyAtributeName;

		if (this.isBackgroundEl(el) || this.isHasImgOrMedia(el) === false) {
			el.setAttribute(keyName, this.loadingStates[state]);
		} else {
			const parentTag = el.parentElement as HTMLElement;

			if (this.isPictureTag(parentTag) || this.isMediaTag(parentTag)) {
				const parent = parentTag.parentElement as HTMLElement;
				parent.setAttribute(keyName, this.loadingStates[state]);

				return;
			}

			parentTag.setAttribute(keyName, this.loadingStates[state]);
		}
	}

	private removeLoadingState(el: HTMLElement) {
		const keyName = this.lazyAtributeName;

		if (this.isBackgroundEl(el) || this.isHasImgOrMedia(el) === false) {
			el.removeAttribute(keyName);
		} else {
			const parentTag = el.parentElement as HTMLElement;

			if (this.isPictureTag(parentTag) || this.isMediaTag(parentTag)) {
				const parent = parentTag.parentElement as HTMLElement;
				parent.removeAttribute(keyName);

				return;
			}

			parentTag.removeAttribute(keyName);
		}
	}

	private getLoadEventNameByEl(el: HTMLElement) {
		const parentTag = el.parentElement as HTMLElement;

		// loadedmetadata для медиа тегов video и т.д load для img тега
		return this.isMediaTag(el) || this.isMediaTag(parentTag)
			? 'loadedmetadata'
			: 'load';
	}

	private getMediaTag(el: HTMLElement) {
		const parentTag = el.parentElement as HTMLElement;

		if (this.isMediaTag(el)) {
			return el;
		}

		if (this.isMediaTag(parentTag)) {
			return parentTag;
		}

		return null;
	}

	private getListenerEl(el: HTMLElement) {
		const mediaTagEl = this.getMediaTag(el);
		const backgroundEl = this.isBackgroundEl(el) ? new Image() : null;

		return mediaTagEl || backgroundEl || el;
	}

	private addEventListener(
		el: HTMLElement,
		eventName: string,
		callback: (e: Event) => void,
	) {
		const fn = (e: Event) => {
			callback(e);
		};

		el.addEventListener(eventName, fn);

		this.listeners.push({
			el,
			name: eventName,
			callback: fn,
		});
	}

	private observer(el: HTMLElement, options: OptionsType) {
		const observer = new IntersectionObserver(
			(
				entries: IntersectionObserverEntry[],
				observer: IntersectionObserver,
			) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						this.load(el);
						observer.unobserve(el);
					}
				});
			},
			options,
		);

		observer.observe(el);

		this.observerInstance = observer;
	}

	private setSources(el: HTMLElement) {
		const elements: HTMLElement[] = [];
		const parentTag = el.parentElement as HTMLElement;
		const isMediaTagParent = this.isMediaTag(parentTag);
		const isPictureTagParent = this.isPictureTag(parentTag);

		if (isMediaTagParent || isPictureTagParent) {
			const queryString = isPictureTagParent
				? '[data-src], [data-srcset]'
				: '[data-src]';

			elements.push(
				...Array.from(
					parentTag.querySelectorAll(
						queryString,
					) as NodeListOf<HTMLElement>,
				),
			);
		} else {
			elements.push(el);
		}

		elements.forEach((el) => {
			const src = el.getAttribute('data-src');
			const srcset = el.getAttribute('data-srcset');

			if (src) {
				el.setAttribute('src', src);
			}

			if (srcset) {
				el.setAttribute('srcset', srcset);
			}
		});
	}

	private load(el: HTMLElement) {
		// Элемент с src или srcset или data-bg
		if (this.isHasImgOrMedia(el)) {
			this.setLoadingState(el, 'LOADING');

			const loadEventName = this.getLoadEventNameByEl(el);
			const listenerEl = this.getListenerEl(el);

			this.addEventListener(listenerEl, loadEventName, (e: Event) => {
				this.removeLoadingState(el);
				this.setLoadingState(el, 'LOADED');

				if (this.isBackgroundEl(el)) {
					const src = (e.target as HTMLImageElement).src;
					el.style.backgroundImage = `url(${src})`;
				}
			});

			this.addEventListener(listenerEl, 'error', () => {
				this.removeLoadingState(el);
				this.setLoadingState(el, 'ERROR');
			});

			if (this.isBackgroundEl(el)) {
				const src = el.getAttribute('data-bg') || '';
				// используем listenerEl потому что это кастомный image элемент(для деталей смотри метод getListenerEl)
				listenerEl.setAttribute('src', src);
			} else {
				this.setSources(el);
			}

			const mediaTag = this.getMediaTag(el);

			if (mediaTag) {
				// Дизаблим поведения браузера(Если включено экономия трафика) то не подгуризтся превью видео
				// preload будет preload="none" и не вызовится событие (loadedmetadata) выше, поэтому напрямую вызываем load
				(mediaTag as HTMLMediaElement).load();
			}
		} else {
			// div и т.д элементы нужны чисто для индикации(Чтобы можно было по классу в css грузить картинку и т.д)
			this.setLoadingState(el, 'LOADED');
		}
	}

	public update(el: HTMLElement, options: OptionsType) {
		if (
			(el.dataset.src && this.prevSrcOfImage !== el.dataset.src) ||
			(el.dataset.bg && this.prevSrcOfImage !== el.dataset.bg)
		) {
			const normalizedOptions = this.normalizeOptions(el, options);

			this.destroy();
			this.init(el, normalizedOptions);
		}
	}

	public init(el: HTMLElement, options: OptionsType) {
		this.observer(el, options);
	}

	public destroy() {
		this.prevSrcOfImage = undefined;
		this.observerInstance?.unobserve(this.el);
		this.listeners.forEach((listener) => {
			const { el, name, callback } = listener;

			el.removeEventListener(name, callback);
		});
	}
}

const store = new WeakMap<HTMLElement, InstanceType<typeof LazyLoad>>();

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive('lazy', <Directive<HTMLElement, OptionsType>>{
		mounted(el: HTMLElement, binding) {
			const lazyLoad = new LazyLoad(el, binding.value);
			store.set(el, lazyLoad);
		},
		updated(el: HTMLElement, binding) {
			const lazyload = store.get(el);
			lazyload?.update(el, binding.value);
		},
		beforeUnmount(el: HTMLElement) {
			const lazyload = store.get(el);
			lazyload?.destroy();
		},
	});
});
