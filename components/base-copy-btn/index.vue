<template>
	<div
		class="base-copy-btn"
		@click="onCopy"
	>
		<span
			class="tooltip"
			:class="{ active: showCopiedTooltip }"
		>
			Ссылка скопирована
		</span>
		<input
			ref="inputEl"
			class="input"
			type="text"
			:value="text"
		/>
		<BaseIcon name="svg/link" />
	</div>
</template>

<script setup lang="ts">
	import { ref, toRef } from 'vue';
	import { useTimeout } from '@/composables/use-timeout';
	import BaseIcon from '@/components/base-icon';

	const props = defineProps({
		text: {
			type: String,
			required: true,
		},
	});

	const text = toRef(() => props.text);
	const inputEl = ref<HTMLInputElement>();
	const showCopiedTooltip = ref(false);
	const timeout = useTimeout();

	const onCopy = () => {
		const field = inputEl.value;

		if (field) {
			/* Select the text field */
			field.select();
			field.setSelectionRange(0, 99999); /* For mobile devices */

			/* Copy the text inside the text field */
			navigator.clipboard.writeText(field.value);

			/* Alert the copied text */
			showCopiedTooltip.value = true;

			timeout(() => {
				showCopiedTooltip.value = false;
			}, 900);
		}
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
