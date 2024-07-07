<template>
	<div
		v-if="topMenu"
		ref="menuEl"
		class="the-menu"
		:class="{ active: showSubMenu }"
	>
		<div
			class="close"
			@click="onCloseMenu"
		></div>
		<div
			ref="topMenuEl"
			class="top"
			:class="{ 'menu-inited': menuInited }"
		>
			<ul class="list">
				<li
					v-for="(item, index) in topMenu"
					ref="topMenuItemEls"
					:key="item.id"
					class="item"
					:class="{
						item_hide:
							indexOfNotVisibleItem &&
							index >= indexOfNotVisibleItem,
					}"
				>
					<NuxtLink
						v-if="!item.sub_menu"
						class="link"
						:to="item.link"
						@click="onCloseMenu"
					>
						{{ item.name }}
					</NuxtLink>
					<span
						v-else
						class="link link_has-dropdown"
						:class="{ active: showSubMenu }"
						@click="onToggleSubMenu"
					>
						{{ item.name }}
					</span>

					<span
						v-if="item.last_month_count"
						class="count"
					>
						{{ `+${item.last_month_count}` }}
					</span>
				</li>
				<li
					v-if="menuTopDropDown"
					class="dropdown-menu"
				>
					<div
						class="dropdown-menu-btn"
						:class="{ active: showDropDownMenu }"
						@click="onToggleDropDown"
					></div>
					<ul
						class="dropdown-menu-list"
						:class="{ active: showDropDownMenu }"
					>
						<li
							v-for="item in menuTopDropDown"
							:key="item.id"
							class="dropdown-menu-item"
						>
							<NuxtLink
								class="dropdown-menu-link"
								:to="item.link"
								@click="onCloseMenu"
							>
								{{ item.name }}
							</NuxtLink>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<div
			v-if="servicesMenu"
			class="middle-wrap"
			:class="{ active: showSubMenu }"
		>
			<div
				class="close-services"
				@click="onCloseMenu"
			></div>
			<div class="middle">
				<div class="row">
					<div class="services">
						<div
							v-for="(items, index) in servicesMenu"
							:key="index"
							class="col"
						>
							<ul
								v-for="subItem in items"
								:key="subItem.id"
								class="service"
								:class="{
									active: serviceActiveClasses[subItem.id],
								}"
							>
								<li class="service-item">
									<div class="service-link-with-button">
										<NuxtLink
											class="service-name"
											:to="subItem.link"
											@click="onCloseMenu"
										>
											{{ subItem.name }}
										</NuxtLink>
										<span
											v-if="
												subItem.items &&
												subItem.items.length
											"
											class="service-button"
											@click.stop="
												onToggleChildren(subItem.id)
											"
										></span>
									</div>
									<ul
										v-if="
											subItem.items &&
											subItem.items.length
										"
										ref="subServiceEls"
										class="sub-services"
									>
										<li
											v-for="element in subItem.items"
											:key="element.id"
											class="sub-services-item"
										>
											<NuxtLink
												class="sub-services-name"
												:to="element.link"
												@click="onCloseMenu"
											>
												{{ element.name }}
											</NuxtLink>
										</li>
									</ul>
								</li>
							</ul>
						</div>
					</div>
					<div
						v-if="topMenuWithoutServicesLink"
						class="mob-menu-bottom"
					>
						<ul class="list">
							<li
								v-for="item in topMenuWithoutServicesLink"
								:key="item.id"
								class="item"
							>
								<NuxtLink
									class="link"
									:to="item.link"
									@click="onCloseMenu"
								>
									{{ item.name }}
								</NuxtLink>
								<span
									v-if="item.last_month_count"
									class="count"
								>
									{{ `+${item.last_month_count}` }}
								</span>
							</li>
						</ul>
					</div>
					<div
						v-if="phone"
						class="phone"
					>
						<a :href="`tel:${phone.phone}`">{{ phone.label }}</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
	import { useMenuStore } from '@/stores/menu';
	import { useEventBuss } from '@/composables/use-event-bus';
	import { useMediaQuery } from '@/composables/use-media-query';
	import { useClickOutside } from '@/composables/use-click-outside';
	import { useEventListener } from '@/composables/use-event-listener';
	import { useWindowResizeAxisX } from '@/composables/use-window-resize-axis-x';

	const menuStore = useMenuStore();

	const topMenu = computed(() => {
		return menuStore.menuTop?.items;
	});

	const topMenuWithoutServicesLink = computed(() => {
		return topMenu.value?.filter((item) => {
			if (item.link === '/services/') return false;

			return true;
		});
	});

	const servicesMenu = computed(() => {
		const menu = menuStore.menuServices?.items;

		if (menu) {
			return createGroups(menu, 3);
		}

		return null;
	});

	const createGroups = <T,>(arr: T[], numGroups: number) => {
		const perGroup = Math.ceil(arr.length / numGroups);
		return new Array(numGroups)
			.fill('')
			.map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup));
	};

	const contentMenu = computed(() => {
		return menuStore.menuContent;
	});

	const phone = computed(() => {
		return contentMenu.value?.phones?.[1] || null;
	});

	const showSubMenu = ref(false);
	const subServiceEls = ref<HTMLElement[]>();
	const showDropDownMenu = ref(false);
	const serviceActiveClasses = ref<{ [key: string]: boolean }>({});

	const onToggleChildren = (key: string) => {
		serviceActiveClasses.value[key] = !serviceActiveClasses.value[key];
	};

	const onCloseDropDown = () => {
		showDropDownMenu.value = false;
	};

	const onCloseMenu = () => {
		onCloseDropDown();
		showSubMenu.value = false;
		serviceActiveClasses.value = {};
		document.body.classList.remove('on-show-menu');
	};

	const onToggleDropDown = () => {
		showDropDownMenu.value = !showDropDownMenu.value;
	};

	const onToggleSubMenu = () => {
		onCloseDropDown();
		document.body.classList.toggle('on-show-menu');
		showSubMenu.value = !showSubMenu.value;
	};

	const getWidthOfElement = (el: HTMLElement) => {
		let width = el.offsetWidth;

		// если элемент скрыт с display: none
		if (width === 0) {
			el.style.display = 'inline-block';
			width = el.offsetWidth;
			el.style.display = '';
		}

		return width;
	};

	const menuInited = ref(false);
	const topMenuEl = ref<HTMLElement>();
	const topMenuItemEls = ref<HTMLElement[]>();
	const indexOfNotVisibleItem = ref<number | null>(null);
	const menuTopDropDown = ref<typeof topMenu | null>(null);

	// Add three dots (with dropdown menu) if menu is not fit to full width
	const buildMenuWithDropDown = () => {
		menuInited.value = false;

		let partWidthOfItems = 0;
		const topMenuWidth = topMenuEl.value?.offsetWidth;
		const topMenuItems = topMenuItemEls.value;

		if (!topMenuWidth) return;

		menuTopDropDown.value = null;
		indexOfNotVisibleItem.value = null;

		topMenuItems?.some((item, index) => {
			const isLastElementIndex = topMenuItems.length === index + 1;
			partWidthOfItems += getWidthOfElement(item);

			// 40 in conditions is min content width of .dropdown-menu-btn(three dots) element
			if (
				partWidthOfItems >
				topMenuWidth - (isLastElementIndex ? 0 : 40)
			) {
				indexOfNotVisibleItem.value = index;
				menuTopDropDown.value = topMenu.value?.slice(index);
				return true;
			}

			return false;
		});

		menuInited.value = true;
	};

	const setSubSevicesHeight = () => {
		subServiceEls.value?.forEach((element) => {
			element.style.setProperty(
				'--max-height',
				`${element.scrollHeight}px`,
			);
		});
	};

	const menuEl = ref<HTMLElement>();
	const eventBus = useEventBuss();
	const mediaQuery = useMediaQuery();
	const clickOutside = useClickOutside();
	const eventListener = useEventListener();
	const eventListenerResizeAxisX = useWindowResizeAxisX();
	let destroyResizeFn = () => {};
	let destroyScrollEvent = () => {};
	let destroyClickEvent = () => {};

	onMounted(() => {
		setSubSevicesHeight();
		eventListenerResizeAxisX(setSubSevicesHeight);

		mediaQuery('(min-width: 1280px)', (matches) => {
			if (matches) {
				document.fonts.ready.then(() => {
					buildMenuWithDropDown();

					destroyResizeFn = eventListenerResizeAxisX(
						buildMenuWithDropDown,
					);
				});

				destroyScrollEvent = eventListener(
					window,
					'scroll',
					onCloseDropDown,
					{
						passive: true,
					},
				);

				if (menuEl.value) {
					destroyClickEvent = clickOutside(menuEl.value, onCloseMenu);
				}
			} else {
				destroyResizeFn();
				destroyScrollEvent();
				destroyClickEvent();
			}
		});

		eventBus.on('toggle-mob-menu', onToggleSubMenu);
	});

	onBeforeUnmount(() => {
		eventBus.off('toggle-mob-menu', onToggleSubMenu);
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
