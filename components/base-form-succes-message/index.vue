<template>
	<div class="base-form-success-message">
		<div class="title">Заявка отправлена</div>
		<div class="text">Спасибо, что обратились -)</div>
		<div class="btn">
			<BaseButton
				theme="third"
				@click="onCloseSuccessMessage"
			>
				Закрыть
			</BaseButton>
		</div>
	</div>
</template>

<script setup lang="ts">
	import BaseButton from '@/components/base-button';

	const emits = defineEmits<{
		(e: 'close'): void;
	}>();

	const onCloseSuccessMessage = () => {
		emits('close');
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
