<template>
	<section class="base-certificates-about">
		<div class="container">
			<div class="row">
				<div class="aside">
					<BaseCertificatesAside />
				</div>
				<div class="main">
					<div class="top">
						<div class="title">
							{{ title }}
						</div>
						<div class="text">
							{{ text }}
						</div>
					</div>
					<div
						v-if="awards"
						v-match-height="{
							selectors: ['[data-match-height]'],
						}"
						class="awards"
					>
						<BaseSwiper :options="swiperOptionsAwards">
							<BaseSwiperSlide
								v-for="(item, index) in awards"
								:key="index"
							>
								<div class="award">
									<BaseAwardVertical :data="item" />
								</div>
							</BaseSwiperSlide>
						</BaseSwiper>
					</div>
					<div
						v-if="certificates"
						ref="certificatesWrapEl"
						class="certificates-wrap"
					>
						<div
							v-for="(item, index) in certificates"
							:key="index"
							class="certificates"
						>
							<div class="certificates__title">
								{{ item.name }}
							</div>
							<div
								v-match-height="{
									selectors: ['[data-match-height]'],
								}"
								class="slider"
							>
								<BaseSwiper
									:options="swiperOptionsCertificates"
								>
									<BaseSwiperSlide
										v-for="(
											childItem, childIndex
										) in item.items"
										:key="childIndex"
									>
										<template v-if="childItem.link">
											<div class="certificate-history">
												<BaseCertificateHistory
													:data="
														childItem as NonNullableField<
															typeof childItem,
															'link'
														>
													"
												/>
											</div>
										</template>
										<template v-else-if="childItem.text">
											<div class="certificate-award">
												<BaseAwardVertical
													:data="
														childItem as NonNullableField<
															typeof childItem,
															'text'
														>
													"
												/>
											</div>
										</template>
										<template v-else>
											<div class="certificate">
												<BaseCertificate
													:data="childItem"
												/>
											</div>
										</template>
									</BaseSwiperSlide>
								</BaseSwiper>
							</div>
						</div>
					</div>
					<div class="histories">
						<BaseHistorySlider :data="histories" />
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { ref, computed, onMounted } from 'vue';
	import type { BaseType, NonNullableField } from './type';
	import type { OptionsType as BaseSwiperOptionsType } from '@/components/base-swiper/type';
	import { useMediaQuery } from '@/composables/use-media-query';
	import { useWindowResizeAxisX } from '@/composables/use-window-resize-axis-x';
	import BaseCertificatesAside from '@/components/base-certificates-aside';
	import BaseSwiper from '@/components/base-swiper';
	import BaseSwiperSlide from '@/components/base-swiper/base-swiper-slide';
	import BaseAwardVertical from '@/components/base-award-vertical';
	import BaseCertificate from '@/components/base-certificate';
	import BaseCertificateHistory from '@/components/base-certificate-history';
	import BaseHistorySlider from '@/components/base-history-slider';

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

	const awards = computed(() => {
		const data = props.data.awards;

		if (data && data.items?.length > 0) {
			return data.items;
		}

		return null;
	});

	const certificates = computed(() => {
		const data = props.data.certificates;

		if (data && data.items?.length > 0) {
			const cetificates = data.items.filter((item) => {
				return item.items && item.items.length > 0;
			});

			return cetificates.length > 0 ? cetificates : null;
		}

		return null;
	});

	const histories = computed(() => {
		return props.data.histories;
	});

	const isMob = ref(false);

	const swiperOptionsAwards = computed<BaseSwiperOptionsType>(() => {
		return {
			init: isMob.value,
			slidesPerView: 'auto',
			mousewheel: {
				forceToAxis: true,
			},
		};
	});

	const swiperOptionsCertificates = computed<BaseSwiperOptionsType>(() => {
		return {
			init: isMob.value,
			slidesPerView: 'auto',
			mousewheel: {
				forceToAxis: true,
			},
		};
	});

	const certificatesWrapEl = ref<HTMLElement>();
	const mediaQuery = useMediaQuery();
	const windowResizeAxisX = useWindowResizeAxisX();

	onMounted(() => {
		const element = certificatesWrapEl.value;

		if (element) {
			const slide = element.querySelector('.swiper-slide') as HTMLElement;

			if (slide) {
				const setCssVarSlideWidth = () => {
					element.style.setProperty(
						'--certificate-about-slide-width',
						`${slide.offsetWidth}px`,
					);
				};

				setCssVarSlideWidth();

				windowResizeAxisX(setCssVarSlideWidth);
			}
		}

		mediaQuery('(max-width: 767px)', (matches) => {
			isMob.value = matches;
		});
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
