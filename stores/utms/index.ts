import { shallowRef } from 'vue';
import { defineStore } from 'pinia';
import { UTM_FIELD_NAMES } from '@/constants';

type UtmsObjectType = Record<(typeof UTM_FIELD_NAMES)[number], string>;

export const useUtmsStore = defineStore('utms', () => {
	const utms = shallowRef<UtmsObjectType>({
		utm_source: '',
		utm_medium: '',
		utm_campaign: '',
		utm_content: '',
		utm_term: '',
	});

	const setUtms = (utmsData: Partial<UtmsObjectType>) => {
		utms.value = {
			...utms.value,
			...utmsData,
		};
	};

	return {
		utms,
		setUtms,
	};
});
