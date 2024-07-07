export type BaseType = {
	items: {
		picture: string | null;
		name: string;
		text: string | null;
		link: string | null;
		show_popup?: boolean; // use in custom referral page
	}[];
};
