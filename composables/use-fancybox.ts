import { onBeforeUnmount } from 'vue';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

type DataType = { src: string }[];
type OptionsType = { startIndex?: number };

export const useFancybox = () => {
	onBeforeUnmount(() => {
		Fancybox.destroy();
	});

	return {
		show(data: DataType, options?: OptionsType) {
			Fancybox.show(data, {
				startIndex: options?.startIndex,
				Toolbar: {
					enabled: true,
					display: {
						left: ['infobar'],
						middle: [],
						right: ['thumbs', 'close'],
					},
				},
				Carousel: {
					infinite: false,
				},
				Thumbs: {
					type: 'classic',
					showOnStart: false,
				},
			});
		},
	};
};
