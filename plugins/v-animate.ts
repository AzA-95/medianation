import { defineNuxtPlugin } from 'nuxt/app';

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive('animate', {
		mounted(el: HTMLElement) {
			function callback(
				entries: IntersectionObserverEntry[],
				observer: IntersectionObserver,
			) {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						// Используем data атрибут для инцилизации анимации вместо классов
						// Чтобы не было конфликтов с динмическим классом у элемента вью при обновление
						// see https://github.com/vuejs/vue/issues/11503
						el.setAttribute('data-animate-inited', 'true');
						observer.unobserve(el);
					}
				});
			}

			function createInterserctionObserver() {
				const options = {
					root: null,
					threshold: 0.1,
				};

				const observer = new IntersectionObserver(callback, options);

				observer.observe(el);
			}

			createInterserctionObserver();
		},
	});
});
