import { useMenuStore } from '@/stores/menu';

export const initMenuData = () => {
	const menuStore = useMenuStore();

	menuStore.fetchMenuTop();
	menuStore.fetchMenuServices();
	menuStore.fetchMenuContent();
};
