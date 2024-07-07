type NonNullableFields<T> = {
	[P in keyof T]-?: NonNullable<T[P]>;
};

export type NonNullableField<T, K extends keyof T> = T &
	NonNullableFields<Pick<T, K>>;

export type BaseType = {
	name: string;
	text: string;
	awards: {
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
	certificates: {
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
	};
	histories: {
		name: string;
		items: {
			picture: string | null;
			date: string;
			name: string;
			link: string | null;
			year: string;
		}[];
	};
};
