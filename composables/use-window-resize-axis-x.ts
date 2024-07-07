import { useEventListener } from '@/composables/use-event-listener';

export const useWindowResizeAxisX = () => {
	const listener = useEventListener();

	return (callback: () => void) => {
		let prevWindowWidth = window.innerWidth;

		return listener(window, 'resize', () => {
			if (prevWindowWidth !== window.innerWidth) {
				prevWindowWidth = window.innerWidth;
				callback();
			}
		});
	};
};
