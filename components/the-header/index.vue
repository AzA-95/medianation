<template>
	<header class="the-header">
		<div class="logo">
			<TheLogo />
		</div>
		<div class="intro">
			<div class="intro-text">Продвижение бизнеса в интернете</div>
		</div>
		<div class="burger">
			<TheBurger />
		</div>
		<div class="menu">
			<TheMenu />
		</div>
		<div class="callback">
			<template v-if="isPageJobs">
				<div class="scroll-to-form-btn">
					<BaseButton
						:modifier-classes="['without-default-hover']"
						@click="onScrollToVacancyForm"
					>
						Связаться с нами
					</BaseButton>
				</div>
			</template>
			<template v-else>
				<div
					v-if="!isFormOpen"
					class="open-form-btn"
				>
					<BaseButton
						:modifier-classes="['without-default-hover']"
						@click="onOpenForm"
					>
						Связаться с нами
					</BaseButton>
				</div>
				<div
					v-else
					class="close-form-btn"
				>
					<BaseButton
						theme="second"
						:modifier-classes="['without-default-hover']"
						@click="onCloseForm"
					>
						<template #default>Закрыть</template>
						<template #right-icon>
							<i class="close-form-btn__icon"></i>
						</template>
					</BaseButton>
				</div>
			</template>
		</div>

		<BaseFormShadow @click="onCloseForm" />
	</header>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import { useRoute } from 'vue-router';
	import { scrollTo } from '@/utils/ui';
	import TheLogo from '@/components/the-logo';
	import TheBurger from '@/components/the-burger';
	import TheMenu from '@/components/the-menu';
	import BaseButton from '@/components/base-button';
	import BaseFormShadow from '@/components/base-form-shadow';

	const route = useRoute();

	const emits = defineEmits<{
		(e: 'open-form'): void;
		(e: 'close-form'): void;
	}>();

	const props = defineProps({
		isFormOpen: {
			type: Boolean,
			required: true,
		},
	});

	const isFormOpen = computed(() => {
		return props.isFormOpen;
	});

	const isPageJobs = computed(() => {
		return route.path.startsWith('/jobs/');
	});

	const onOpenForm = () => {
		emits('open-form');
	};

	const onCloseForm = () => {
		emits('close-form');
	};

	const onScrollToVacancyForm = () => {
		scrollTo({
			to: '.js-the-footer-jobs-form__scroll-pos',
		});
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
