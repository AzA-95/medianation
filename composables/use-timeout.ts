import { onBeforeUnmount } from 'vue';

type TimeoutType = ReturnType<typeof setTimeout>;

export const useTimeout = () => {
	const timeouts: TimeoutType[] = [];

	const destroyTimeout = (timeoutId: TimeoutType) => {
		clearTimeout(timeoutId);
	};

	onBeforeUnmount(() => {
		timeouts.forEach((timeoutId) => {
			clearTimeout(timeoutId);
		});
	});

	return (callback: () => void, timeout: number) => {
		const timeoutId = setTimeout(() => {
			callback();
		}, timeout);

		timeouts.push(timeoutId);

		return () => destroyTimeout(timeoutId);
	};
};
