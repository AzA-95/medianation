export type BaseType = {
	name: string;
	video: {
		link: string;
		time: string;
	} | null;
	picture: string | null;
	picture_params: {
		width: string;
		height: string;
	} | null;
	text: string | null;
	link: string;
	is_link_remote?: boolean;
	button_name?: string;
};
