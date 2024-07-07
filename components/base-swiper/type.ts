import type { Swiper, SwiperModule, SwiperOptions } from 'swiper/types';

export type BaseType = Swiper;
export type ModuleType = SwiperModule;
export type OptionsType = Omit<SwiperOptions, 'modules'>;
