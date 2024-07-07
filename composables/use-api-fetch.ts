import { useFetch, useRuntimeConfig } from 'nuxt/app';

export const useApiFetch: typeof useFetch = (request, options) => {
	const config = useRuntimeConfig();

	return useFetch(request, {
		baseURL: config.public.apiUrl,
		deep: false,
		...options,
		transform: (data) => {
			type Data = typeof data;
			// Времный костыль пока не пофиксят в nuxt fix me
			// Происходит ошибка [Vue warn]: Hydration text content mismatch in: в клиенте
			// если апи отдает текст с символолами(\r\n И в клиенте текст рендерится без v-html)
			// в vue2 такой проблемы не было
			// Issue по этой теме
			// issue https://github.com/nuxt/nuxt/issues/23234
			// issue https://github.com/vuejs/core/issues/9229
			const jsonString = JSON.stringify(data);
			const resultString = jsonString.replace(/(?:\\[rn]|[\r\n]+)+/g, '');
			const result = JSON.parse(resultString);

			if (options && options.transform) {
				return options.transform(result);
			}

			return result as Data;
		},
	});
};
