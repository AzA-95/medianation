import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useIsFirstLoadPageStore = defineStore(
	'useIsFirstLoadPageStore',
	() => {
		const isFirstLoadPage = ref(true);

		const change = () => {
			isFirstLoadPage.value = false;
		};

		return {
			isFirstLoadPage,
			change,
		};
	},
);
