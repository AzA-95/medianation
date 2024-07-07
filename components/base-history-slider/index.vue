<template>
	<div class="base-history-slider">
		<div class="title">{{ title }}</div>
		<div class="years">
			<div
				v-for="(year, index) in years"
				:key="index"
				class="year"
				:class="{ active: activeYearIndex === index }"
				@click="onClickYear(index)"
			>
				{{ year }}
			</div>
		</div>
		<div
			ref="sliderEl"
			class="slider"
		>
			<BaseSwiper
				:options="swiperOptions"
				@swiper="onSwiper"
			>
				<BaseSwiperSlide
					v-for="([key, items], index) in itemsByYear"
					:key="index"
				>
					<div
						class="histories"
						:data-year="key"
					>
						<div
							v-for="(item, childIndex) in items"
							:key="childIndex"
							class="history"
							:class="{ history_white: item.picture === null }"
						>
							<div
								v-if="item.picture"
								class="history__pic"
							>
								<img
									v-lazy
									:data-src="item.picture"
									alt="picture"
								/>
							</div>
							<div class="history__desc">
								<div class="history__date">{{ item.date }}</div>
								<div class="history__name">{{ item.name }}</div>
							</div>

							<nuxt-link
								v-if="item.link"
								class="history__full-link"
								:to="item.link"
							></nuxt-link>
						</div>
					</div>
				</BaseSwiperSlide>
			</BaseSwiper>

			<BaseSliderArrowButton
				ref="prevButtonEl"
				:modifier-classes="['small', 'theme-second']"
				:is-prev="true"
				@click="onSlideToPrevOrNext('prev')"
			/>
			<BaseSliderArrowButton
				ref="nextButtonEl"
				:modifier-classes="['small', 'theme-second']"
				:is-next="true"
				@click="onSlideToPrevOrNext('next')"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { PropType, UnwrapNestedRefs } from 'vue';
	import { ref, computed } from 'vue';
	import type { BaseType } from './type';
	import { useEventListener } from '@/composables/use-event-listener';
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
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const title = computed(() => {
		return props.data.name;
	});

	const years = computed(() => {
		const result: string[] = [];
		const items = props.data.items;

		// Года берем с items(Вместо filter.year с апи) чтобы не выводить года которых нету в items
		items.forEach((item) => {
			if (!result.includes(item.year)) {
				result.push(item.year);
			}
		});

		return result;
	});

	const itemsByYear = computed(() => {
		const items = props.data.items;
		const mapObj = new Map<string, (typeof items)[0][]>();

		items.forEach((item) => {
			const keyName = item.year;

			if (mapObj.has(keyName)) {
				mapObj.get(keyName)!.push(item);
			} else {
				mapObj.set(keyName, [item]);
			}
		});

		return mapObj;
	});

	const prevButtonEl = ref<UnwrapNestedRefs<BaseSliderArrowButtonType>>();
	const nextButtonEl = ref<UnwrapNestedRefs<BaseSliderArrowButtonType>>();

	const swiperOptions = computed<BaseSwiperOptionsType>(() => {
		return {
			slidesPerView: 'auto',
			freeMode: {
				enabled: true,
			},
			mousewheel: {
				forceToAxis: true,
			},
			on: {
				init: () => {
					const prevBtn = prevButtonEl.value?.element;

					if (prevBtn) {
						prevBtn.classList.add('swiper-button-disabled');
					}
				},
				reachBeginning: () => {
					const prevBtn = prevButtonEl.value?.element;

					if (prevBtn) {
						prevBtn.classList.add('swiper-button-disabled');
					}
				},
				reachEnd: () => {
					const nextBtn = nextButtonEl.value?.element;

					if (nextBtn) {
						nextBtn.classList.add('swiper-button-disabled');
					}
				},
				fromEdge: () => {
					const prevBtn = prevButtonEl.value?.element;
					const nextBtn = nextButtonEl.value?.element;

					if (prevBtn && nextBtn) {
						prevBtn.classList.remove('swiper-button-disabled');
						nextBtn.classList.remove('swiper-button-disabled');
					}
				},
			},
		};
	});

	const eventListener = useEventListener();
	const sliderEl = ref<HTMLElement>();
	const activeYearIndex = ref(0);
	const sliderInstance = ref<null | BaseSwiperType>(null);

	const onSwiper = (instance: BaseSwiperType) => {
		sliderInstance.value = instance;
		const sliderWrapperEl = sliderEl.value!.querySelector(
			'.swiper-wrapper',
		) as HTMLElement;
		const slidersEl = sliderEl.value!.querySelectorAll(
			'.swiper-slide',
		) as NodeListOf<HTMLElement>;

		// Событие slideResetTransitionEnd не вызывается при клике по кнопкам слайдера
		// По этому используем событие transitionend от css
		eventListener(sliderWrapperEl, 'transitionend', () => {
			const curentTranslate = Math.abs(instance.getTranslate());

			for (const [index, item] of slidersEl.entries()) {
				const posOfElement = item.offsetLeft + item.offsetWidth;

				if (curentTranslate >= posOfElement) {
					activeYearIndex.value = index + 1;
				} else if (index === 0) {
					activeYearIndex.value = 0;
					break;
				} else {
					break;
				}
			}
		});
	};

	const onClickYear = (index: number) => {
		const slider = sliderInstance.value;

		if (slider) {
			slider.slideTo(index);
			activeYearIndex.value = index;
		}
	};

	const onSlideToPrevOrNext = (position: 'prev' | 'next') => {
		const slider = sliderInstance.value;
		const distance = position === 'prev' ? 350 : -350; // 350px это ширина блока(В Десктопе)

		if (slider) {
			slider.translateTo(slider.getTranslate() + distance, 300);
		}
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
