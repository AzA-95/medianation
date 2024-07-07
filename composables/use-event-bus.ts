import mitt from 'mitt';

type EventsType = {
	'toggle-mob-menu': boolean;
	'toggle-header-form': boolean;
};

const emitter = mitt<EventsType>();

export const useEventBuss = () => {
	return emitter;
};
