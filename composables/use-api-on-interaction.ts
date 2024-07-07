import { useRuntimeConfig } from 'nuxt/app';

// Используется для запросов на клиенте подробности в issue
// https://github.com/nuxt/nuxt/discussions/25602
export const useApiOnInteraction = <T>(
	request: Parameters<typeof $fetch<T>>[0],
	options?: Parameters<typeof $fetch<T>>[1],
) => {
	const config = useRuntimeConfig();

	return $fetch<T>(request, {
		baseURL: config.public.apiUrl,
		...options,
	});
};
