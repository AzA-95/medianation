// component_name: StaticBannerGallery old component(Будет использоваться пока не отрфакторят апи)
type FirstType = {
	breadcrumbs: {
		name: string;
		link: string | null;
	}[];
	background: string;
	title: string; // pased from services page
	description: string | null;
	price_from: string;
	awards: {
		id: 'lists/award';
		name: string;
		items: {
			name: string;
			text: string;
			picture: string;
			picture_params: {
				width: string;
				height: string;
			};
		}[];
	};
};

// Используется пока не обновят контент со страницы https://medianation.ru/api/v1/page/services/issledovaniya/
// component_name: BannerGallery old component
type SecondType = {
	breadcrumbs: {
		name: string;
		link: string | null;
	}[];
	title: string; // pased from services page
	slider: {
		items:
			| {
					title: string;
					text: string | null;
					picture: string;
					picture_params: {
						width: string;
						height: string;
					};
			  }[]
			| null;
	};
	awards: {
		id: 'lists/award';
		name: string;
		items: {
			name: string;
			text: string;
			picture: string;
			picture_params: {
				width: string;
				height: string;
			};
		}[];
	};
};

export type BaseType = FirstType | SecondType;
