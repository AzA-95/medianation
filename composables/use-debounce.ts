import { onBeforeUnmount } from 'vue';
import { useTimeout } from '@/composables/use-timeout';

export const useDebounce = () => {
	let destroy = () => {};

	const timeout = useTimeout();

	onBeforeUnmount(() => {
		destroy();
	});

	return (callback: () => void, time: number) => {
		return () => {
			destroy();
			destroy = timeout(callback, time);
		};
	};
};

// Пример использования
// const debounce = useDebounce();
// const debounceSecond = useDebounce();

// debounce(() => {}, 100)
// debounceSecond(() => {}, 200)
