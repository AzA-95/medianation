export const setViewportWitdhToVar = () => {
	const scrollbarWidth =
		window.innerWidth - document.documentElement.clientWidth;

	// переменная используется в postcss плагине
	document.documentElement.style.setProperty(
		'--vw',
		`${(window.innerWidth - scrollbarWidth) / 100}px`,
	);
};
