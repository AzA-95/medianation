<template>
	<footer class="the-footer">
		<div class="top">
			<div class="inner">
				<div class="menu-with-callback">
					<nav
						v-if="menuTop"
						class="menu-top"
					>
						<ul class="menu-top__list">
							<li
								v-for="(item, index) in menuTop"
								:key="index"
								class="menu-top__item"
							>
								<NuxtLink
									:to="item.link"
									class="menu-top__link"
								>
									{{ item.name }}
								</NuxtLink>
							</li>
						</ul>
					</nav>
					<div class="callback">
						<template v-if="isPageJobs">
							<div class="scroll-to-form-btn">
								<BaseButton
									:modifier-classes="[
										'without-default-hover',
									]"
									@click="onScrollToVacancyForm"
								>
									Связаться с нами
								</BaseButton>
							</div>
						</template>
						<template v-else>
							<div
								v-if="!isFormOpen || !isDesktop"
								class="open-form-btn"
							>
								<BaseButton
									:modifier-classes="[
										'without-default-hover',
									]"
									@click="onOpenForm"
								>
									Связаться с нами
								</BaseButton>
							</div>
							<div
								v-else
								class="close-form-btn"
							>
								<BaseButton
									theme="second"
									:modifier-classes="[
										'without-default-hover',
									]"
									@click="onCloseForm"
								>
									<template #default>Закрыть</template>
									<template #right-icon>
										<i class="close-form-btn__icon"></i>
									</template>
								</BaseButton>
							</div>
						</template>
					</div>
				</div>

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
			</div>
		</div>

		<div class="middle">
			<div class="inner">
				<div class="menu-services">
					<div
						v-for="(item, index) in menuServices"
						:key="index"
						class="menu-services__service"
					>
						<div
							class="menu-service"
							:class="{
								'menu-service_without-sub-services':
									!item.items,
								active: activeServices[index],
							}"
						>
							<div
								class="menu-service__title"
								@click="
									item.items ? onToggleSubMenu(index) : null
								"
							>
								<NuxtLink :to="item.link">
									{{ item.name }}
								</NuxtLink>
								<button
									type="button"
									class="menu-service__toggle-btn"
								></button>
							</div>
							<nav
								v-if="item.items"
								ref="menuSubServicesEl"
								class="menu-service__nav"
							>
								<ul class="menu-service__list">
									<li
										v-for="(childItem, i) in item.items"
										:key="i"
										class="menu-service__item"
									>
										<NuxtLink
											class="menu-service__link"
											:to="childItem.link"
										>
											{{ childItem.name }}
										</NuxtLink>
									</li>
								</ul>
							</nav>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="bottom">
			<div class="inner">
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
		</div>
	</footer>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted } from 'vue';
	import { useRoute } from 'vue-router';
	import SkLogoIcon from './images/sk-logo.svg';
	import { scrollTo } from '@/utils/ui';
	import { useMenuStore } from '@/stores/menu';
	import { useMediaQuery } from '@/composables/use-media-query';
	import { useMutationObserver } from '@/composables/use-mutation-observer';
	import { useWindowResizeAxisX } from '@/composables/use-window-resize-axis-x';
	import BaseButton from '@/components/base-button';
	import BaseSocials from '@/components/base-socials';
	import BaseEmailInfo from '@/components/base-email-info';

	const route = useRoute();

	const emits = defineEmits<{
		(e: 'open-form', value: 'footer'): void;
		(e: 'close-form', value: 'footer'): void;
	}>();

	const props = defineProps({
		isFormOpen: {
			type: Boolean,
			required: true,
		},
	});

	const menuStore = useMenuStore();

	const menuTop = computed(() => {
		return menuStore.menuTop?.items;
	});

	const menuServices = computed(() => {
		return menuStore.menuServices?.items;
	});

	const isFormOpen = computed(() => {
		return props.isFormOpen;
	});

	const isPageJobs = computed(() => {
		return route.path.startsWith('/jobs/');
	});

	const onOpenForm = () => {
		emits('open-form', 'footer');
	};

	const onCloseForm = () => {
		emits('close-form', 'footer');
	};

	const onScrollToVacancyForm = () => {
		scrollTo({
			to: '.js-the-footer-jobs-form__scroll-pos',
		});
	};

	const activeServices = ref<Record<number, boolean | undefined>>({});

	const onToggleSubMenu = (index: number) => {
		const value = activeServices.value[index];
		activeServices.value[index] = !value;
	};

	const menuSubServicesEl = ref<HTMLElement[]>();

	const setHeightToCssVar = () => {
		document.fonts.ready.then(() => {
			menuSubServicesEl.value?.forEach((el) => {
				el.style.setProperty('--max-height', `${el.scrollHeight}px`);
			});
		});
	};

	const date = new Date().getFullYear();
	const emailEl = ref<HTMLElement>();
	const isDesktop = ref(true);
	const isEmailChanged = ref(false);

	const mediaQuery = useMediaQuery();
	const mutationObserver = useMutationObserver();
	const eventListenerResizeAxisX = useWindowResizeAxisX();

	onMounted(() => {
		setHeightToCssVar();
		eventListenerResizeAxisX(setHeightToCssVar);

		mediaQuery('(min-width: 1280px)', (matches) => {
			isDesktop.value = matches;
		});

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
