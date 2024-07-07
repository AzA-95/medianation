<template>
	<section
		v-if="items"
		class="base-photo-slider"
	>
		<div class="container">
			<h2 class="title">{{ title }}</h2>
			<div class="slider">
				<BaseSwiper
					:options="swiperOptions"
					@swiper="onSwiper"
				>
					<BaseSwiperSlide
						v-for="(item, index) in items"
						:key="index"
					>
						<div
							class="pic"
							:class="{ active: activeSlideIndex === index }"
							@click="onCallGallery(index)"
						>
							<img
								v-lazy
								:data-src="item.prev_picture"
								:width="item.prev_picture_params.width"
								:height="item.prev_picture_params.height"
								alt="picture"
							/>
						</div>
					</BaseSwiperSlide>
				</BaseSwiper>

				<BaseSliderArrowButton
					ref="prevButtonEl"
					:modifier-classes="['small', 'theme-second']"
					:is-prev="true"
				/>
				<BaseSliderArrowButton
					ref="nextButtonEl"
					:modifier-classes="['small', 'theme-second']"
					:is-next="true"
				/>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import type { PropType, UnwrapNestedRefs } from 'vue';
	import { ref, computed } from 'vue';
	import type { BasePhotoSliderType } from './type';
	import { useFancybox } from '@/composables/use-fancybox';
	import type {
		BaseType as BaseSwiperType,
		OptionsType as BaseSwiperOptionsType,
	} from '@/components/base-swiper/type';
	import BaseSwiper from '@/components/base-swiper';
	import BaseSwiperSlide from '@/components/base-swiper/base-swiper-slide';
	import type { BaseSliderArrowButtonType } from '@/components/base-slider-arrow-button/type';
	import BaseSliderArrowButton from '@/components/base-slider-arrow-button';

	const props = defineProps({
		data: {
			type: Object as PropType<BasePhotoSliderType>,
			required: true,
		},
	});

	const title = computed(() => {
		return props.data.name;
	});

	const items = computed(() => {
		const items = props.data.items;
		const hasItems = items && items.length;

		return hasItems ? items : null;
	});

	const activeSlideIndex = ref(0);
	const prevButtonEl = ref<UnwrapNestedRefs<BaseSliderArrowButtonType>>();
	const nextButtonEl = ref<UnwrapNestedRefs<BaseSliderArrowButtonType>>();

	const swiperOptions = computed<BaseSwiperOptionsType>(() => {
		return {
			slidesPerView: 'auto',
			mousewheel: {
				forceToAxis: true,
			},
			navigation: {
				prevEl: prevButtonEl.value?.element,
				nextEl: nextButtonEl.value?.element,
			},
		};
	});

	const onSwiper = (instance: BaseSwiperType) => {
		// Используем свой кастомный активный класс так как .swiper-slide-active
		// не определяет как активный последний слайд
		instance.on('snapIndexChange', () => {
			activeSlideIndex.value = instance.snapIndex;
		});
	};

	const photos = computed(() => {
		return items.value?.map((photo) => {
			return {
				src: photo.prev_picture as string,
			};
		});
	});

	const fancybox = useFancybox();

	const onCallGallery = (index: number) => {
		fancybox.show(photos.value!, { startIndex: index });
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
