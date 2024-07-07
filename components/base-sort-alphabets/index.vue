<template>
	<div class="base-sort-alphabets">
		<div class="container">
			<div class="slider">
				<BaseSwiper :options="swiperOptions">
					<BaseSwiperSlide
						v-for="(letter, index) in letters"
						:key="index"
					>
						<span
							class="alphabet"
							:data-letter="letter"
							:class="{ active: letter === activeLetter }"
							@click="letterChanged(letter)"
						>
							{{ letter }}
						</span>
					</BaseSwiperSlide>
				</BaseSwiper>

				<div class="scrollbar">
					<BaseSliderScrollbar ref="scrollbarEl" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { UnwrapNestedRefs, PropType } from 'vue';
	import { ref, computed } from 'vue';
	import type { OptionsType as BaseSwiperOptionsType } from '@/components/base-swiper/type';
	import BaseSwiper from '@/components/base-swiper';
	import BaseSwiperSlide from '@/components/base-swiper/base-swiper-slide';
	import type { BaseSliderScrollbarType } from '@/components/base-slider-scrollbar/type';
	import BaseSliderScrollbar from '@/components/base-slider-scrollbar';

	const emits = defineEmits<{
		(e: 'letter-clicked', value: string): void;
	}>();

	const props = defineProps({
		letters: {
			type: Array as PropType<string[]>,
			required: true,
		},
		activeLetter: {
			type: String,
			required: true,
		},
	});

	const letters = computed(() => {
		return props.letters;
	});

	const activeLetter = computed(() => {
		return props.activeLetter;
	});

	const letterChanged = (letter: string) => {
		emits('letter-clicked', letter);
	};

	const scrollbarEl = ref<UnwrapNestedRefs<BaseSliderScrollbarType>>();

	const swiperOptions = computed<BaseSwiperOptionsType>(() => {
		return {
			slidesPerView: 'auto',
			mousewheel: {
				forceToAxis: true,
			},
			scrollbar: {
				el: scrollbarEl.value?.element,
				draggable: true,
			},
		};
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
