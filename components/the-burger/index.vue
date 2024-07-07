<template>
	<div
		class="the-burger"
		@click="onShowMobMenu"
	>
		<div class="section">
			<i></i>
			<i></i>
			<i></i>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useEventBuss } from '@/composables/use-event-bus';

	const eventBus = useEventBuss();

	const onShowMobMenu = () => {
		eventBus.emit('toggle-mob-menu', true);
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
