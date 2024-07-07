<template>
	<div
		class="base-icon-partners"
		:class="[
			modifierClasses,
			{ 'base-icon-partners_dark': theme === 'dark' },
		]"
	>
		<div class="title">{{ title }}</div>

		<div
			v-match-height="{
				selectors: ['[data-match-height]'],
			}"
			class="slider"
		>
			<BaseSwiper :options="swiperOptions">
				<BaseSwiperSlide
					v-for="(item, index) in items"
					:key="index"
				>
					<template v-if="item.link">
						<div class="certificate-history">
							<BaseCertificateHistory
								:data="
									item as NonNullableField<
										typeof item,
										'link'
									>
								"
								:modifier-classes="
									theme === 'dark' ? ['dark'] : null
								"
							/>
						</div>
					</template>
					<template v-else-if="item.text">
						<div class="award">
							<BaseAwardVertical
								:data="
									item as NonNullableField<
										typeof item,
										'text'
									>
								"
								:modifier-classes="
									theme === 'dark' ? ['white'] : null
								"
							/>
						</div>
					</template>
					<template v-else>
						<div class="certificate">
							<BaseCertificate
								:data="
									item as RequireKeys<
										typeof item,
										'detail_file'
									>
								"
							/>
						</div>
					</template>
				</BaseSwiperSlide>
			</BaseSwiper>

			<BaseSliderArrowButton
				ref="prevButtonEl"
				:modifier-classes="
					theme !== 'dark' ? ['small', 'theme-second'] : ['small']
				"
				:is-prev="true"
			/>
			<BaseSliderArrowButton
				ref="nextButtonEl"
				:modifier-classes="
					theme !== 'dark' ? ['small', 'theme-second'] : ['small']
				"
				:is-next="true"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { PropType, UnwrapNestedRefs } from 'vue';
	import { ref, computed } from 'vue';
	import type { NonNullableField, RequireKeys, BaseType } from './type';
	import type { OptionsType as BaseSwiperOptionsType } from '@/components/base-swiper/type';
	import BaseSwiper from '@/components/base-swiper';
	import BaseSwiperSlide from '@/components/base-swiper/base-swiper-slide';
	import BaseCertificateHistory from '@/components/base-certificate-history';
	import BaseAwardVertical from '@/components/base-award-vertical';
	import BaseCertificate from '@/components/base-certificate';
	import type { BaseSliderArrowButtonType } from '@/components/base-slider-arrow-button/type';
	import BaseSliderArrowButton from '@/components/base-slider-arrow-button';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
		theme: {
			type: String as PropType<'dark' | null>,
			default: null,
		},
		modifierClasses: {
			type: Array as PropType<
				| (
						| 'award-fixed-width'
						| 'title-bg-sz'
						| 'toprates'
						| 'certificate-bigger-mob'
				  )[]
				| null
			>,
			default: null,
		},
	});

	const modifierClasses = computed(() => {
		return props.modifierClasses?.map((item) => {
			return `base-icon-partners_${item}`;
		});
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
