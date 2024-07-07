import { onBeforeUnmount } from 'vue';

type ListenerType = {
	el: Document | HTMLElement | Window;
	type: keyof WindowEventMap;
	callback: (event: Event) => void;
	options?: AddEventListenerOptions;
};

export const useEventListener = () => {
	let uId = 0;
	// let isDestroyded = false; fix me remove me
	const listeners = new Map<number, ListenerType>();

	const addEventListener = (
		key: number,
		{ el, type, callback, options }: ListenerType,
	) => {
		el.addEventListener(type, callback, options);
		listeners.set(key, { el, type, callback, options });
	};

	const removeEventListener = (key: number) => {
		const { el, type, callback, options } = listeners.get(
			key,
		) as ListenerType;

		el.removeEventListener(type, callback, options);
		listeners.delete(key);
	};

	onBeforeUnmount(() => {
		// isDestroyded = true; fix me remove me
		listeners.forEach((_, key) => {
			removeEventListener(key);
		});
	});

	return (
		el: ListenerType['el'],
		type: ListenerType['type'],
		callback: ListenerType['callback'],
		options?: ListenerType['options'],
	) => {
		// fix me remove me
		// Доп зашита
		// Возрашаем функцию чтобы не ломать обещание
		// if (isDestroyded) return () => {};

		uId += 1;
		addEventListener(uId, { el, type, callback, options });

		return ((uId) => {
			return () => removeEventListener(uId);
		})(uId);
	};
};
