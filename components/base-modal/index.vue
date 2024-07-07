<template>
	<ClientOnly>
		<Teleport to="body">
			<div
				v-if="show"
				ref="modalEl"
				class="base-modal"
			>
				<div class="inner">
					<div
						class="overlay"
						@click="onCloseModal"
					></div>
					<div class="content">
						<slot></slot>
					</div>
				</div>
			</div>
		</Teleport>
	</ClientOnly>
</template>

<script setup lang="ts">
	import { ref, watch, onBeforeUnmount } from 'vue';
	import type { ElementType } from './type';

	const emits = defineEmits<{
		(e: 'close'): void;
	}>();

	const props = defineProps({
		show: {
			type: Boolean,
			required: true,
		},
	});

	const onCloseModal = () => {
		emits('close');
	};

	const addClassToBody = () => {
		document.body.classList.add('modal-opened');
	};

	const removeClassFromBody = () => {
		document.body.classList.remove('modal-opened');
	};

	watch(
		() => props.show,
		(value) => {
			if (!process.client) return;

			if (value === false) {
				removeClassFromBody();
				return;
			}

			addClassToBody();
		},
		{
			immediate: true,
		},
	);

	onBeforeUnmount(() => {
		removeClassFromBody();
	});

	const modalEl = ref<HTMLElement>();

	defineExpose<ElementType>({
		element: modalEl,
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
