import { useEventListener } from '@/composables/use-event-listener';

export const useClickOutside = () => {
	const eventListener = useEventListener();

	return (element: HTMLElement, callback: () => void) => {
		return eventListener(document, 'click', (e: Event) => {
			const target = e.target as HTMLElement;

			if (element.contains(target) === false) {
				callback();
			}
		});
	};
};
