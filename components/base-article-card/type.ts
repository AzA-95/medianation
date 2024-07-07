export type BaseType = {
	name: string;
	date: string;
	link: string;
	picture: string;
	show_type: 'small' | 'medium' | 'large';
	show_count: number;
	reading_time: string;
	text: string | null;
	tags: string[] | null;
};
