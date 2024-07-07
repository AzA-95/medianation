type ScrollOptionsType = {
	scrollableEl?: typeof window | HTMLElement;
	to: string | HTMLElement;
	top?: number;
	smoth?: boolean;
};

export const scrollTo = (options: ScrollOptionsType) => {
	const defaultOptions: Omit<ScrollOptionsType, 'to'> = {
		scrollableEl: window,
		top: 0,
		smoth: true,
	};

	const normalizedOptions = {
		...defaultOptions,
		...options,
	} as Required<ScrollOptionsType>;

	const { scrollableEl, to, top, smoth } = normalizedOptions;

	let element: HTMLElement | null;
	const isToElString = typeof to === 'string';

	if (scrollableEl === window) {
		element = isToElString ? document.querySelector(to) : to;
	} else {
		element = isToElString
			? (scrollableEl as HTMLElement).querySelector(to)
			: to;
	}

	if (
		(!scrollableEl && !element) ||
		(scrollableEl && !element) ||
		(!scrollableEl && element)
	) {
		/* eslint-disable-next-line no-console */
		console.error('[scrollTo] - passed incorrect arguments');
		return;
	}

	let scrollPos = element!.getBoundingClientRect().top;

	if (scrollableEl === window) {
		scrollPos += window.scrollY;
	} else {
		const scrollable = scrollableEl as HTMLElement;
		scrollPos +=
			scrollable.scrollTop - scrollable.getBoundingClientRect().top;
	}

	scrollableEl.scrollTo({
		top: scrollPos + top,
		behavior: smoth ? 'smooth' : 'instant',
	});
};

export const isElementFullInViewport = (
	el: HTMLElement,
	scrollableEl?: HTMLElement | null,
	fixedTop = 0,
) => {
	const rectEl = el.getBoundingClientRect();

	if (scrollableEl) {
		const rectScrollable = scrollableEl.getBoundingClientRect();

		return (
			rectEl.top - fixedTop - rectScrollable.top >= 0 &&
			rectEl.left - rectScrollable.left >= 0 &&
			rectEl.bottom <= rectScrollable.bottom &&
			rectEl.right <= rectScrollable.right
		);
	}

	return (
		rectEl.top - fixedTop >= 0 &&
		rectEl.left >= 0 &&
		rectEl.bottom <= window.innerHeight &&
		rectEl.right <= window.innerWidth
	);
};

export const getOffsetTop = (target: HTMLElement) => {
	// Сделал без getBoundingClientRect
	// чтобы функция возрашала конкретную позицию дом элемента даже для (postion: sticky)
	// и для элментов с transform
	let curtop = 0;

	if (target.offsetParent) {
		do {
			curtop += target.offsetTop;
			// eslint-disable-next-line no-unmodified-loop-condition
		} while ((target = target.offsetParent as HTMLElement));

		return curtop;
	}

	return curtop;
};
