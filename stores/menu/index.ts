import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { TopMenuType, ServicesMenuType, ContentMenuType } from './type';
import { useApiFetch } from '@/composables/use-api-fetch';

export const useMenuStore = defineStore('menu', () => {
	const menuTop = ref<null | TopMenuType>(null);

	const fetchMenuTop = async () => {
		const { data } = await useApiFetch<TopMenuType>('ui/menu/top/');
		menuTop.value = data.value;
	};

	const menuServices = ref<null | ServicesMenuType>(null);

	const fetchMenuServices = async () => {
		const { data } = await useApiFetch<ServicesMenuType>(
			'ui/menu/services/',
			{
				transform: (data) => {
					// Костыль по временому добавлению пункта меню во второй уровень "SEO-продвижение".
					// Так как страница пока без апи, добавляем ссылку на страницу отсюда
					data.items.some((item) => {
						if (item.id === '3') {
							// Пункт меню SEO-продвижение
							item.items?.push({
								// Добавляем пункт меню (SEO-консультация) В под пункты меню (SEO-продвижение)
								id: '223132', // Рандомный id
								name: 'SEO-консультация',
								active: true,
								link: '/services/seo/seo-consultation/',
								depth: 2,
								parent: '3',
							});

							// break loop
							return true;
						}

						return false;
					});

					return data;
				},
			},
		);

		menuServices.value = data.value;
	};

	const menuContent = ref<null | ContentMenuType>(null);

	const fetchMenuContent = async () => {
		const { data } = await useApiFetch<ContentMenuType>('ui/content/');

		menuContent.value = data.value;
	};

	return {
		menuTop,
		fetchMenuTop,
		menuServices,
		fetchMenuServices,
		menuContent,
		fetchMenuContent,
	};
});
