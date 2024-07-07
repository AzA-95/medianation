<template>
	<div class="base-contact-socials">
		<div class="container">
			<div class="title">Мы в социальных сетях</div>
			<div class="socials">
				<BaseSocials :modifier-classes="['big']" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import BaseSocials from '@/components/base-socials';
</script>

<style scoped lang="scss" src="./style.scss"></style>
