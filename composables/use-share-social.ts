export type SocialsType = 'vk' | 'telegram' | 'linkedin';

type ParametrsType = {
	network: SocialsType;
	url: string;
	title: string;
	description?: string;
	media?: string;
};

// При желание можно расширить список(Пока список ограничен списком который используется на сайте)
const networksRawLink: Record<SocialsType, string> = {
	vk: 'https://vk.com/share.php?url=@u&title=@t&description=@d&image=@m&noparse=true',
	telegram: 'https://t.me/share/url?url=@u&text=@t%0D%0A@d',
	linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=@u',
};

const getCenterOfPopupCordinates = () => {
	const popupWindowWidth = 626;
	const popupWindowHeight = 436;
	const availWidth = window.screen.availWidth;
	const availHeight = window.screen.availHeight;

	const posTop = availHeight - popupWindowHeight;
	const top = posTop > 0 ? posTop / 2 : 0;

	const posLeft = availWidth - popupWindowWidth;
	const left = posLeft > 0 ? posLeft / 2 : 0;

	const width = Math.min(availWidth, popupWindowWidth);
	const height = Math.min(availHeight, popupWindowHeight);

	return {
		top,
		left,
		width,
		height,
	};
};

let prevURL: null | string = null;
let windowPopup: null | ReturnType<typeof window.open> = null;

const openWindowPopup = (url: string, config: string) => {
	return window.open(url, 'share-social-tab', config);
};

// Используется чуть не по назначению с названием файла, но не стал выносить отдельно в файл
// Чтобы не дублировать или не выносить отдельно повторяющуюся логику (для двух файлов)
export const getShareLink = (args: ParametrsType) => {
	const shareSocialRawLink = networksRawLink[args.network];

	const shareLink = shareSocialRawLink
		.replace(/@u/g, encodeURIComponent(args.url))
		.replace(/@t/g, encodeURIComponent(args.title))
		.replace(/@d/g, encodeURIComponent(args.description || ''))
		.replace(/@m/g, encodeURIComponent(args.media || ''));

	return shareLink;
};

export const useShareSocial = (args: ParametrsType) => {
	const cordinates = getCenterOfPopupCordinates();
	const popupWindowConfig = `top=${cordinates.top},left=${cordinates.left},width=${cordinates.width},height=${cordinates.height}`;

	const shareLink = getShareLink(args);

	if (windowPopup === null || windowPopup.closed) {
		windowPopup = openWindowPopup(shareLink, popupWindowConfig);
	} else if (prevURL !== shareLink) {
		// Можно было бы не закрывая окно грузить новый контент(В текушем окне для оптимизации).
		// Но выглядит не красиво как будто бы контент завис с контентом старой страницы
		// (пока контент новой страницы не прогрузится поэтому закрываем старое окно и открыаем новое окно)
		windowPopup.close();
		windowPopup = openWindowPopup(shareLink, popupWindowConfig);
	} else {
		windowPopup.focus();
	}

	prevURL = shareLink;
};
