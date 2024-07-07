import { shallowRef } from 'vue';
import { defineStore } from 'pinia';
import type { MetaTagsType } from '@/types/meta';

export const useMetaStore = defineStore('meta', () => {
	const meta = shallowRef<Partial<Omit<MetaTagsType, 'h1'>>>({});

	const setMeta = (metaData: Omit<MetaTagsType, 'h1'>) => {
		meta.value = metaData;
	};

	return {
		meta,
		setMeta,
	};
});
