export type BaseType = {
	name: string;
	text: string;
	awards: {
		id: string;
		name: string;
		items: {
			name: string;
			text: string | null;
			picture: string;
			picture_params: {
				width: string;
				height: string;
			};
			detail_file?: string | null;
			link?: string | null;
		}[];
	};
	numbers: {
		name: string;
		items: {
			name: string;
			text: string;
		}[];
	};
	certificates: {
		name: string;
		items: {
			id: string;
			name: string;
			items: {
				name: string;
				text: string | null;
				picture: string;
				picture_params: {
					width: string;
					height: string;
				};
				detail_file?: string | null;
				link?: string | null;
			}[];
		}[];
	};
};
