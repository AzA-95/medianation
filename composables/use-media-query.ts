import { onBeforeUnmount } from 'vue';

type MediaQueryType = {
	query: string;
	callback: (match: boolean) => void;
	options?: {
		callInInit: boolean;
	};
};

type MediaQueryListenerType = {
	mediaQuery: MediaQueryList;
	callback: (event: MediaQueryListEvent) => void;
};

export const useMediaQuery = () => {
	let uId = 0;
	const listeners = new Map<number, MediaQueryListenerType>();

	const addMediaQuery = (
		key: number,
		{ query, callback, options = { callInInit: true } }: MediaQueryType,
	) => {
		const cb = (event: MediaQueryListEvent) => {
			callback(event.matches);
		};

		const mediaQuery = window.matchMedia(query);

		if (options.callInInit) {
			callback(mediaQuery.matches);
		}

		mediaQuery.addEventListener('change', cb);
		listeners.set(key, { mediaQuery, callback: cb });
	};

	const removeEventListener = (key: number) => {
		const { mediaQuery, callback } = listeners.get(
			key,
		) as MediaQueryListenerType;

		mediaQuery.removeEventListener('change', callback);
		listeners.delete(key);
	};

	onBeforeUnmount(() => {
		listeners.forEach((_, key) => {
			removeEventListener(key);
		});
	});

	return (
		query: MediaQueryType['query'],
		callback: MediaQueryType['callback'],
		options?: MediaQueryType['options'],
	) => {
		uId += 1;
		addMediaQuery(uId, { query, callback, options });

		return ((uId) => {
			return () => removeEventListener(uId);
		})(uId);
	};
};
