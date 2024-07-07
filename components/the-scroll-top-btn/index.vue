<template>
	<div
		class="scroll-top-btn"
		:class="{ active: isActive }"
		@click="onScrollToTop"
	>
		Наверх
	</div>
</template>

<script setup lang="ts">
	import { ref, toRef, onMounted } from 'vue';
	import { useEventListener } from '@/composables/use-event-listener';

	const props = defineProps({
		showAlways: {
			type: Boolean,
			defaut: false,
		},
	});

	const isActive = ref(false);
	const showAlways = toRef(() => props.showAlways);

	const onScrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	let lastScrollPos = 0;

	const showOrHideBtn = () => {
		const scrollPos = window.scrollY;

		if (scrollPos > 300) {
			if (showAlways.value) {
				isActive.value = true;
				return;
			}

			isActive.value = lastScrollPos > scrollPos;
			lastScrollPos = scrollPos <= 0 ? 0 : scrollPos; // For Mobile or negative scrolling
		} else {
			isActive.value = false;
		}
	};

	const eventListener = useEventListener();

	onMounted(() => {
		eventListener(window, 'scroll', showOrHideBtn, { passive: true });
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
