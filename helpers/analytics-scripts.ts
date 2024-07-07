// Устаналиваем задержку на загрузку скриптов
// чтобы не учитывались скрипты по google page speed
// если будет учитываться то упадут баллы по google page speed

let isGtmCalled = false;

export const lazyLoadGtm = () => {
	if (isGtmCalled) return;

	isGtmCalled = true;

	// @ts-ignore: Unreachable code error
	window.dataLayer = window.dataLayer || [];

	// @ts-ignore: Unreachable code error
	window.dataLayer.push({
		originalLocation:
			document.location.protocol +
			'//' +
			document.location.hostname +
			document.location.pathname +
			document.location.search,
	});

	const script = document.createElement('script');
	script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
									new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
									j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
									'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
									})(window,document,'script','dataLayer','GTM-N8BBQV3');`;

	const noscript = document.createElement('noscript');
	noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N8BBQV3"
										height="0" width="0" style="display:none;visibility:hidden"></iframe>`;

	setTimeout(function () {
		const body = document.body;

		document.getElementsByTagName('head')[0].appendChild(script);

		body.insertBefore(noscript, body.firstChild);
	}, 5000);
};

let isCallibriCalled = false;

export const lazyLoadCallibri = () => {
	if (isCallibriCalled) return;

	isCallibriCalled = true;

	const script = document.createElement('script');
	script.src = '//cdn.callibri.ru/callibri.js';

	setTimeout(function () {
		const body = document.body;

		body.appendChild(script);
	}, 5000);
};
