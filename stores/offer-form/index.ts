import { defineStore } from 'pinia';
import type { FormType } from '@/types/forms';
import { OFFER_FORM_URL } from '@/constants';
import { useApiFetch } from '@/composables/use-api-fetch';

export const useOfferFormStore = defineStore('offer-form', () => {
	let promise: Promise<FormType | null> | null = null;

	const getData = () => {
		// Предотврошаем сразу несколько вызовов апи
		if (promise) return promise;

		promise = new Promise<FormType | null>((resolve, reject) => {
			useApiFetch<FormType>(OFFER_FORM_URL)
				.then(({ data }) => {
					resolve(data.value);
				})
				.catch((error) => {
					reject(error.value);
				});
		});

		return promise;
	};

	const getFormData = () => {
		return getData();
	};

	return {
		getFormData,
	};
});
