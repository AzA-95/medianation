<template>
	<div
		class="wrapper"
		:class="{
			active: isFormOpen,
		}"
	>
		<div class="wrapper__inner">
			<TheHeader
				:is-form-open="isFormOpen"
				@open-form="onOpenForm"
				@close-form="onCloseForm"
			/>

			<main class="main-content">
				<slot />
			</main>

			<TheFooter
				:is-form-open="isFormOpen"
				@open-form="onOpenForm"
				@close-form="onCloseForm"
			/>

			<ClientOnly>
				<TheScrollTopBtn />
				<TheAcceptCookies />
				<BaseFormShadow @click="onCloseForm" />
			</ClientOnly>
		</div>

		<div class="wrapper__form">
			<TheHeaderForm @close-form="onCloseForm" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
	import { useRoute } from 'vue-router';
	import { useEventBuss } from '@/composables/use-event-bus';
	import TheHeader from '@/components/the-header';
	import TheFooter from '@/components/the-footer';
	import TheHeaderForm from '@/components/the-header-form';
	import TheScrollTopBtn from '@/components/the-scroll-top-btn';
	import TheAcceptCookies from '@/components/the-accept-cookies';
	import BaseFormShadow from '@/components/base-form-shadow';

	const route = useRoute();
	const eventBus = useEventBuss();
	const isFormOpen = ref(false);

	const onOpenForm = (value?: string) => {
		isFormOpen.value = true;

		if (value === 'footer') {
			document.body.classList.add('footer-form-open-trigger');
		}

		document.body.classList.add('on-show-callback');
	};

	const onCloseForm = () => {
		isFormOpen.value = false;

		setTimeout(() => {
			document.body.classList.remove('footer-form-open-trigger');
		}, 500); // равен времни анимации в css

		document.body.classList.remove('on-show-callback');
	};

	watch(() => route.path, onCloseForm);

	onMounted(() => {
		eventBus.on('toggle-mob-menu', onCloseForm);
	});

	onBeforeUnmount(() => {
		eventBus.off('toggle-mob-menu', onCloseForm);
	});
</script>

<style scoped lang="scss">
	.wrapper {
		position: relative;

		@include md-min {
			&__inner {
				min-height: 100vh;
				transition: 0.5s transform ease;
			}

			&.active &__inner {
				transform: translateX(calc(var(--header-form-width) * -1px));
			}
		}

		&__form {
			position: fixed;
			top: 0;
			left: 100%;
			z-index: 12;
			width: calc(var(--header-form-width) * 1px);
			height: 100%;
			transition: 0.5s transform ease;

			@include md-max {
				top: var(--header-height);
				width: 100%;
				height: calc(100% - var(--header-height));
			}
		}

		&.active &__form {
			transform: translateX(-100%);
		}
	}
</style>
