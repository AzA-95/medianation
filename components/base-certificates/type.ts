export type BaseType = {
	name: string;
	awards: {
		name: string;
		items: {
			name: string;
			text: string | null;
			picture: string;
			picture_params: {
				width: string;
				height: string;
			};
		}[];
	};
	numbers: {
		items: {
			name: string;
			text: string;
		}[];
	};
	certificates: {
		name: string;
		items: {
			name: string;
			items: {
				name: string;
				text: string | null;
				picture: string;
				picture_params: {
					width: string;
					height: string;
				};
				detail_file: string | null;
				link: string | null;
			}[];
		}[];
	} | null;
};
