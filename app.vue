<template>
	<NuxtLoadingIndicator color="#e9330b" />
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup lang="ts">
	import { watch, onMounted } from 'vue';
	import { useRoute } from 'vue-router';
	import { useIsFirstLoadPageStore } from '@/stores/is-first-load-page';
	import { useWindowResizeAxisX } from '@/composables/use-window-resize-axis-x';
	import { initMetaTags } from '@/helpers/meta';
	import { initMenuData } from '@/helpers/menu';
	import { initUtmsDataForForm } from '@/helpers/utms';
	import { initAnalyticsDataForForm } from '@/helpers/analytics';
	import { lazyLoadGtm, lazyLoadCallibri } from '@/helpers/analytics-scripts';
	import { setViewportWitdhToVar } from '@/helpers/viewport-witdh';
	import { setScrollbarWitdhToVar } from '@/helpers/scrollbar-witdh';

	initMetaTags();
	initMenuData();

	const route = useRoute();
	const pageStore = useIsFirstLoadPageStore();
	const windowResizeAxisX = useWindowResizeAxisX();

	watch(
		() => route.path,
		() => {
			pageStore.change();
			// @ts-ignore: Unreachable code error
			window.dataLayer?.push({ event: 'page_view' });
		},
	);

	onMounted(() => {
		// initUtmsDataForForm();
		// initAnalyticsDataForForm();
		// lazyLoadGtm();
		// lazyLoadCallibri();
		setScrollbarWitdhToVar();
		setViewportWitdhToVar();
		windowResizeAxisX(() => {
			setScrollbarWitdhToVar();
			setViewportWitdhToVar();
		});
	});
</script>
