<template>
	<footer class="the-footer-small">
		<div class="container">
			<div
				class="info"
				itemscope
				itemtype="http://schema.org/Organization"
			>
				<meta
					itemprop="name"
					content="Агентство интернет-рекламы «МедиаНация»"
				/>
				<div
					class="hidden"
					itemprop="address"
					itemscope
					itemtype="http://schema.org/PostalAddress"
				>
					<meta
						itemprop="addressCountry"
						content="Россия"
					/>
					<meta
						itemprop="addressLocality"
						content="Москва"
					/>
					<meta
						itemprop="streetAddress"
						content="ул. Малая Полянка, д. 2"
					/>
				</div>
				<div
					class="hidden"
					itemprop="address"
					itemscope
					itemtype="http://schema.org/PostalAddress"
				>
					<meta
						itemprop="addressCountry"
						content="Россия"
					/>
					<meta
						itemprop="addressLocality"
						content="Нижний Новгород"
					/>
					<meta
						itemprop="streetAddress"
						content="ул. Нестерова, д.5, 6 этаж"
					/>
				</div>
				<div
					ref="emailEl"
					class="email"
					:class="{ 'email_mb-none': isEmailChanged }"
				>
					<a
						href="mailto:comeon@medianation.ru"
						itemprop="email"
					>
						comeon@medianation.ru
					</a>
				</div>
				<div
					v-if="isEmailChanged"
					class="email-info-wraper"
				>
					<BaseEmailInfo />
				</div>
				<div class="phone">
					<a
						href="tel:+78002221031"
						itemprop="telephone"
					>
						8 800 222-10-31
					</a>
					<a
						href="tel:+74952151097"
						itemprop="telephone"
					>
						8 (495) 215-10-97
					</a>
				</div>
				<div class="socials">
					<BaseSocials :modifier-classes="['footer']" />
				</div>
			</div>
			<div class="bottom-row">
				<div class="logo">
					<div class="logo__pic">
						<img
							v-lazy
							:data-src="SkLogoIcon"
							alt="Участник проекта «Сколково»"
						/>
					</div>
					<div class="logo__desc">
						<div class="logo__title">
							Рекламное агентство MediaNation
						</div>
						<div class="logo__text">
							Участник проекта «Сколково»
						</div>
					</div>
				</div>
				<div class="copyright">
					&copy; 2008–{{ date }} Агентство интернет-рекламы
					«МедиаНация»
					<span>
						ООО «МедиаНация», ОГРН 1097746232682, ИНН 7736602705
					</span>
				</div>
				<div class="personal-data">
					<a
						href="/personal-data/"
						target="_blank"
					>
						Политика конфиденциальности
					</a>
				</div>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import SkLogoIcon from './images/sk-logo.svg';
	import { useMutationObserver } from '@/composables/use-mutation-observer';
	import BaseSocials from '@/components/base-socials';
	import BaseEmailInfo from '@/components/base-email-info';

	const date = new Date().getFullYear();
	const emailEl = ref<HTMLElement>();
	const isEmailChanged = ref(false);

	const mutationObserver = useMutationObserver();

	onMounted(() => {
		mutationObserver(
			emailEl.value!,
			{
				subtree: true,
				childList: true,
				characterData: true,
			},
			(_, observer) => {
				isEmailChanged.value = true;
				observer.disconnect(); // Остановливаем наблюдение после первого выполнения
			},
		);
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
