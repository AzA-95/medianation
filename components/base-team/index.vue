<template>
	<section
		v-if="items.length"
		class="base-team"
	>
		<div
			id="base-team"
			class="scroll-pos"
		></div>
		<div class="container">
			<div class="head">
				<h2
					class="title"
					:class="{ title_full: !text }"
				>
					{{ title }}
				</h2>
				<div
					v-if="text"
					class="text"
				>
					{{ text }}
				</div>
			</div>
			<div
				ref="sliderEl"
				v-match-height="{
					selectors: ['[data-match-height]'],
				}"
				class="slider"
			>
				<BaseSwiper
					:options="swiperOptions"
					@swiper="onSwiper"
				>
					<BaseSwiperSlide
						v-for="(item, index) in items"
						:key="index"
					>
						<div
							v-animate
							class="person"
							data-animate="fade-up"
							:style="`--animation-delay: ${delay(index)}ms;--animation-duration:1s`"
						>
							<div class="person__photo">
								<img
									v-lazy
									:data-src="item.picture"
									:width="item.picture_params.width"
									:height="item.picture_params.height"
									alt="photo"
								/>
								<img
									v-if="item.picture_ex"
									v-lazy
									:data-src="item.picture_ex"
									:width="item.picture_params.width"
									:height="item.picture_params.height"
									alt="photo"
								/>
							</div>
							<div
								data-match-height="true"
								class="person__desc"
							>
								<div class="person__name">{{ item.name }}</div>
								<div class="person__info">
									{{ item.position }}
								</div>
								<div
									v-if="item.experience"
									class="person__experience"
								>
									опыт работы: {{ item.experience }}
								</div>
							</div>
						</div>
					</BaseSwiperSlide>
				</BaseSwiper>
				<BaseSliderArrowButton
					ref="prevButtonEl"
					:is-prev="true"
				/>
				<BaseSliderArrowButton
					ref="nextButtonEl"
					:is-next="true"
				/>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import type { PropType, UnwrapNestedRefs } from 'vue';
	import { ref, shallowRef, computed, nextTick } from 'vue';
	import type { BaseType } from './type';
	import type {
		BaseType as BaseSwiperType,
		OptionsType as BaseSwiperOptionsType,
	} from '@/components/base-swiper/type';
	import { useApiOnInteraction } from '@/composables/use-api-on-interaction';
	import BaseSwiper from '@/components/base-swiper';
	import BaseSwiperSlide from '@/components/base-swiper/base-swiper-slide';
	import type { BaseSliderArrowButtonType } from '@/components/base-slider-arrow-button/type';
	import BaseSliderArrowButton from '@/components/base-slider-arrow-button';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const title = computed(() => {
		return props.data.name;
	});

	const text = computed(() => {
		return props.data.text;
	});

	const nav = shallowRef(props.data.nav);
	const items = shallowRef(props.data.items);

	const prevButtonEl = ref<UnwrapNestedRefs<BaseSliderArrowButtonType>>();
	const nextButtonEl = ref<UnwrapNestedRefs<BaseSliderArrowButtonType>>();

	const swiperOptions = computed<BaseSwiperOptionsType>(() => {
		return {
			slidesPerView: 'auto',
			spaceBetween: -1, // фикс белого отступа между блоками в хроме который появляется (после свайпа слайдера)
			freeMode: {
				enabled: true,
			},
			mousewheel: {
				forceToAxis: true,
			},
			navigation: {
				prevEl: prevButtonEl.value?.element,
				nextEl: nextButtonEl.value?.element,
			},
		};
	});

	const delay = (index: number) => {
		return (index % 6) * 100;
	};

	const sliderEl = ref<HTMLElement>();

	const loadMore = () => {
		const apiPath = nav.value!.next_page_url!.replace('/api/v1/', '');

		return useApiOnInteraction<Pick<BaseType, 'nav' | 'items'>>(
			apiPath,
		).then((data) => {
			nav.value = data.nav;
			items.value = [...items.value, ...data.items];
		});
	};

	const initLoadMore = (instance: BaseSwiperType) => {
		if (sliderEl.value) {
			const getSlidesWidth = () => {
				const slides = Array.from(
					sliderEl.value!.querySelectorAll(
						'.swiper-slide',
					) as NodeListOf<HTMLElement>,
				);

				return slides
					.map((slide) => {
						return slide.offsetWidth;
					})
					.reduce((prev, next) => prev + next);
			};

			let isExecuted = false;
			let ceilSlideWidth = getSlidesWidth() / 2;

			instance.on('setTranslate', (_, translate) => {
				if (
					Math.abs(translate) > ceilSlideWidth &&
					isExecuted === false &&
					nav.value?.next_page_url
				) {
					isExecuted = true;

					loadMore().finally(() => {
						nextTick(() => {
							isExecuted = false;
							ceilSlideWidth = getSlidesWidth() / 2;
							instance.update();
						});
					});
				}
			});
		}
	};

	const onSwiper = (instance: BaseSwiperType) => {
		initLoadMore(instance);
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
