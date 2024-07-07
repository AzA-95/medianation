import { onBeforeUnmount } from 'vue';

export const useMutationObserver = () => {
	const observers: MutationObserver[] = [];

	onBeforeUnmount(() => {
		observers.forEach((observer) => {
			observer.disconnect();
		});
	});

	return (
		element: HTMLElement,
		options: MutationObserverInit,
		callback: (list: MutationRecord[], observer: MutationObserver) => void,
	) => {
		// Создаём экземпляр наблюдателя с указанной функцией колбэка
		const observer = new MutationObserver(callback);

		observers.push(observer);

		// Начинаем наблюдение за настроенными изменениями целевого элемента
		observer.observe(element, options);
	};
};
