<template>
	<div
		v-if="items"
		class="base-news-slider"
	>
		<BaseBlockTitle :is-dark="isTitleDark">
			<h2>{{ title }}</h2>
			<div
				v-if="text"
				class="title-desc"
			>
				{{ text }}
			</div>
		</BaseBlockTitle>
		<div class="container">
			<div class="slider">
				<BaseSwiper :options="swiperOptions">
					<BaseSwiperSlide
						v-for="(item, index) in items"
						:key="index"
					>
						<div class="news">
							<div class="news__pic">
								<img
									v-lazy
									:data-src="item.picture"
									alt="picture"
								/>
							</div>
							<div class="news__content">
								<div class="news__info">
									<span class="news__date">
										{{ item.date }}
									</span>
									<span
										v-if="item.show_count"
										class="news__visible"
									>
										{{ item.show_count }}
									</span>
									<span
										v-if="item.reading_time"
										class="news__read-time"
									>
										{{ item.reading_time }}
									</span>
								</div>
								<div class="news__tags">
									<span
										v-for="(tag, childIndex) in item.tags"
										:key="childIndex"
										class="news__tag"
									>
										#{{ tag }}
									</span>
								</div>
								<NuxtLink
									:to="item.link"
									class="news__name"
								>
									{{ item.name }}
								</NuxtLink>
							</div>
						</div>
					</BaseSwiperSlide>
					<BaseSwiperSlide v-if="moreLink">
						<div class="news">
							<a
								:href="moreLink"
								class="news__more"
								target="_blank"
							>
								Другие статьи
							</a>
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
	</div>
</template>

<script setup lang="ts">
	import type { PropType, UnwrapNestedRefs } from 'vue';
	import { ref, computed } from 'vue';
	import type { BaseNewsSliderType } from './type';
	import { rusWordEnding } from '@/utils/common';
	import BaseBlockTitle from '@/components/base-block-title';
	import type { OptionsType as BaseSwiperOptionsType } from '@/components/base-swiper/type';
	import BaseSwiper from '@/components/base-swiper';
	import BaseSwiperSlide from '@/components/base-swiper/base-swiper-slide';
	import type { BaseSliderArrowButtonType } from '@/components/base-slider-arrow-button/type';
	import BaseSliderArrowButton from '@/components/base-slider-arrow-button';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseNewsSliderType>,
			required: true,
		},
		isTitleDark: {
			type: Boolean,
			default: false,
		},
	});

	const title = computed(() => {
		return props.data.name;
	});

	const text = computed(() => {
		return props.data.text;
	});

	const items = computed(() => {
		const items = props.data.items;
		const hasItems = items && items.length;

		if (hasItems) {
			return items.map((item) => {
				let countText = null;
				const count = item.show_count;

				if (count) {
					const text = rusWordEnding(
						count,
						'просмотр',
						'просмотра',
						'просмотров',
					);

					countText = `${count} ${text}`;
				}

				return {
					...item,
					show_count: countText,
				};
			});
		}

		return hasItems ? items : null;
	});

	const moreLink = computed(() => {
		return props.data.more_link;
	});

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
</script>

<style scoped lang="scss" src="./style.scss"></style>
