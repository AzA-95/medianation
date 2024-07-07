<template>
	<div
		v-if="show"
		class="the-accept-cookies"
	>
		<div class="desc">
			<div class="title">
				Мы используем cookie-файлы
				<i></i>
			</div>
			<div class="text">
				Вы можете отключить cookie-файлы в настройках. Используя сайт
				без изменения настроек, вы даете согласие на использование ваших
				cookie-файлов.
			</div>
		</div>
		<button
			class="btn"
			@click="onAccept"
		>
			Хорошо, я понял
		</button>
	</div>
</template>

<script setup lant="ts">
	import { ref, onMounted } from 'vue';

	const show = ref(false);

	const checkAcceptedCookies = () => {
		const result = localStorage.getItem('acceptCookies');

		if (result === null) {
			show.value = true;
			return;
		}

		const item = JSON.parse(result);

		const now = new Date();

		// compare the expiry time of the item with the current time
		if (now.getTime() > item.expiry) {
			localStorage.removeItem('acceptCookies');
			show.value = true;
		}
	};

	const onAccept = () => {
		const now = new Date();
		now.setFullYear(now.getFullYear() + 1); // plus one year

		const obj = {
			expiry: now.getTime(),
		};

		localStorage.setItem('acceptCookies', JSON.stringify(obj));

		show.value = false;
	};

	onMounted(() => {
		checkAcceptedCookies();
	});
</script>

<style lang="scss" scoped src="./style.scss"></style>
