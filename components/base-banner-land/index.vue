<template>
	<section
		class="base-banner-land"
		:class="[modifierClasses]"
	>
		<div class="container">
			<div class="inner">
				<h1 class="title">
					<span class="big">{{ title }}</span>
					<span
						class="small"
						v-html="text"
					></span>
				</h1>
				<div class="awards">
					<div
						v-for="(award, index) in awards"
						:key="index"
						class="award"
					>
						<BaseAward
							:data="award"
							:use-lazy-image="false"
							:modifier-classes="['bigger']"
						/>
					</div>
				</div>
				<div class="bottom">
					<div class="text">
						Получить коммерческое
						<br />
						предложение или пригласить в тендер
					</div>
					<div class="btn">
						<BaseButton
							theme="third"
							@click="onScrollToForm"
						>
							Оставить заявку
						</BaseButton>
					</div>
				</div>
				<div class="main-site-url">
					<div class="main-site-url__logo">
						<img
							:src="logo"
							alt="logo"
						/>
					</div>
					<div class="main-site-url__text">Основной сайт</div>
					<a
						href="https://medianation.ru/"
						class="main-site-url__full-link"
						target="_blank"
					></a>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import type { PropType } from 'vue';
	import logo from './images/logo.svg';
	import type { BaseType } from './type';
	import { scrollTo } from '@/utils/ui';
	import BaseAward from '@/components/base-award';
	import BaseButton from '@/components/base-button';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
		modifierClasses: {
			type: Array as PropType<'digital'[] | null>,
			default: null,
		},
	});

	const modifierClasses = computed(() => {
		return props.modifierClasses?.map((item) => {
			return `base-banner-land_${item}`;
		});
	});

	const title = computed(() => {
		return props.data.name;
	});

	const text = computed(() => {
		return props.data.text;
	});

	const awards = computed(() => {
		return props.data.awards;
	});

	const onScrollToForm = () => {
		scrollTo({
			to: '.js-the-footer-form__scroll-pos',
		});
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
