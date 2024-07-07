import { createError } from 'nuxt/app';

type ErrorType = {
	statusCode: number;
	statusMessage?: string;
	fatal: boolean;
	error: unknown;
};

export const handleError = ({
	statusCode,
	statusMessage,
	fatal,
	error,
}: ErrorType) => {
	// log(error);
	return createError({
		statusCode,
		statusMessage,
		fatal,
		data: error,
	});
};
