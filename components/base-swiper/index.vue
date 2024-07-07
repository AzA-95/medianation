<template>
	<div class="base-swiper">
		<div
			ref="swiperEl"
			class="swiper"
			data-lazy-parent
		>
			<div class="swiper-wrapper">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	// data-lazy-parent нужен для lazy-laod картинок(Чтобы подгружались по раньше)
	// подробности смотри в plugins/v-lazy.ts

	// import { Swiper } from 'swiper';
	import type { PropType } from 'vue';
	import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
	import { Swiper } from './swiper';
	import type { BaseType, OptionsType, ModuleType } from './type';

	const emits = defineEmits<{
		(e: 'swiper', instance: BaseType): void;
	}>();

	const props = defineProps({
		options: {
			type: Object as PropType<OptionsType>,
			required: true,
		},
	});

	const modules: ModuleType[] = [];
	const modulesPath: Record<string, string | any> = {
		navigation: 'navigation',
		pagination: 'pagination',
		fadeEffect: 'fade-effect',
		mousewheel: 'mousewheel',
		scrollbar: 'scrollbar',
		freeMode: 'free-mode',
		thumbs: 'thumbs',
		grid: 'grid',
	};

	const loadModules = async () => {
		const options = Object.keys(props.options);
		const promises = [];

		for (const key of options) {
			const fileName = modulesPath[key];

			if (fileName) {
				promises.push(import(`./modules/${fileName}.ts`));
			}
		}

		try {
			const loadedComponents = await Promise.all(promises);

			loadedComponents.forEach((component) => {
				modules.push(component.default);
			});
		} catch (error) {
			/* eslint-disable-next-line no-console */
			console.error(error);
		}
	};

	await loadModules();

	let swiper: BaseType | null = null;
	const swiperEl = ref<HTMLElement>();

	const initSwiper = () => {
		if (swiperEl.value) {
			swiper = new Swiper(swiperEl.value, {
				...props.options,
				modules,
			});

			emits('swiper', swiper);
		}
	};

	// fix me initialized
	const destroySwiper = () => {
		if (swiper && swiper.initialized) {
			swiper.destroy(true, true);
			swiper = null;
		}
	};

	watch(
		() => {
			return props.options;
		},
		() => {
			destroySwiper();
			initSwiper();
		},
	);

	onMounted(() => {
		initSwiper();
	});

	onBeforeUnmount(() => {
		destroySwiper();
	});
</script>

<style>
	/* Стили для модулей(Слайдера) грузятся динамически когда используется модуль
	Для подробностей смотири функцию loadModules и папку ./modules */
	@import 'swiper/css';
</style>
