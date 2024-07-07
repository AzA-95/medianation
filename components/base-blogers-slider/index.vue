<template>
	<section class="base-blogers-slider">
		<div class="top">
			<div class="container">
				<h2 class="title">{{ title }}</h2>
			</div>
		</div>
		<div class="slider">
			<BaseSwiper :options="swiperOptions">
				<BaseSwiperSlide
					v-for="(item, index) in items"
					:key="index"
				>
					<div class="bloger">
						<div class="pic">
							<img
								v-lazy
								:data-src="item.picture"
								:alt="item.name"
							/>
						</div>
						<div class="content">
							<div class="name">{{ item.name }}</div>
							<div class="socials-list">
								<div
									v-for="(
										childItem, childIndex
									) in item.socials"
									:key="childIndex"
									class="socials-item"
								>
									<div class="icon">
										<BaseIcon
											:name="`svg/${childItem.type}`"
										/>
									</div>
									<div class="subscribers">
										<div class="count">
											{{ childItem.count }}
										</div>
										<div class="text">Подписчиков</div>
									</div>
									<a
										:href="childItem.link"
										class="full-link"
										target="_blank"
									></a>
								</div>
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
	</section>
</template>

<script setup lang="ts">
	import { ref, computed } from 'vue';
	import type { PropType, UnwrapNestedRefs } from 'vue';
	import type { BaseType } from './type';
	import type { OptionsType as BaseSwiperOptionsType } from '@/components/base-swiper/type';
	import type { BaseSliderArrowButtonType } from '@/components/base-slider-arrow-button/type';
	import BaseSwiper from '@/components/base-swiper';
	import BaseSwiperSlide from '@/components/base-swiper/base-swiper-slide';
	import BaseIcon from '@/components/base-icon';
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

	const items = computed(() => {
		return props.data.items;
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
