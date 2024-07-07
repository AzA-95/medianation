import type { Ref } from 'vue';
import { useEventListener } from '@/composables/use-event-listener';
import { useApiOnInteraction } from '@/composables/use-api-on-interaction';

export const useInfinityScroll = () => {
	const eventListener = useEventListener();

	return <T>({
		element,
		url,
		onSuccess,
		onError,
		top = 500,
	}: {
		element: HTMLElement;
		url: Ref<string | null>;
		onSuccess: (data: T) => void;
		onError: (e: unknown) => void;
		top?: number;
	}) => {
		let isLoading = false;

		eventListener(window, 'scroll', async () => {
			if (url.value) {
				const scrollPos = window.scrollY;
				const { top: topRect, height } =
					element.getBoundingClientRect();
				const scrollBottomPosition = scrollPos + window.innerHeight;
				const endOfElementPosition = scrollPos + topRect + height - top;

				if (
					scrollBottomPosition > endOfElementPosition &&
					isLoading === false
				) {
					isLoading = true;

					try {
						const data = await useApiOnInteraction<T>(url.value);
						onSuccess(data);
					} catch (error) {
						onError(error);
					}

					isLoading = false;
				}
			}
		});
	};
};
