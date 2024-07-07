<template>
	<section class="base-awards-with-certificates">
		<div class="container">
			<h2 class="title">{{ title }}</h2>
			<div
				v-if="awards"
				v-match-height="{
					selectors: ['[data-match-height]'],
				}"
				class="awards"
			>
				<div
					v-for="(award, index) in awards"
					:key="index"
					class="award"
				>
					<BaseAwardVertical
						:data="award"
						:modifier-classes="['sm-fz-bigger']"
					/>
				</div>
			</div>
			<div
				v-if="certificates"
				class="certificates"
			>
				<BaseSwiper :options="swiperOptions">
					<BaseSwiperSlide
						v-for="(item, index) in certificates"
						:key="index"
					>
						<div class="certificate">
							<div class="certificate__pic">
								<img
									v-lazy
									:data-src="item.picture"
									:alt="item.name"
								/>
							</div>
							<div class="certificate__content">
								<div class="certificate__name">
									{{ item.name }}
								</div>
								<div class="certificate__text">
									{{ item.text }}
								</div>
							</div>
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
	import type { BaseType } from './type';
	import type { OptionsType as BaseSwiperOptionsType } from '@/components/base-swiper/type';
	import type { BaseSliderArrowButtonType } from '@/components/base-slider-arrow-button/type';
	import BaseSwiper from '@/components/base-swiper';
	import BaseSwiperSlide from '@/components/base-swiper/base-swiper-slide';
	import BaseSliderArrowButton from '@/components/base-slider-arrow-button';
	import BaseAwardVertical from '@/components/base-award-vertical';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const title = computed(() => {
		return props.data.name;
	});

	const awards = computed(() => {
		const items = props.data.awards?.items;

		return items && items.length ? items : null;
	});

	const certificates = computed(() => {
		const items = props.data.certificates?.items;

		return items && items.length ? items : null;
	});

	const prevButtonEl = ref<UnwrapNestedRefs<BaseSliderArrowButtonType>>();
	const nextButtonEl = ref<UnwrapNestedRefs<BaseSliderArrowButtonType>>();

	const swiperOptions = computed<BaseSwiperOptionsType>(() => {
		return {
			slidesPerView: 'auto',
			freeMode: {
				enabled: true,
				momentumRatio: 1.3,
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
</script>

<style scoped lang="scss" src="./style.scss"></style>
