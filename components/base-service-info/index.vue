<template>
	<section
		class="base-service-info"
		:class="{ 'has-mb': !menuItems }"
	>
		<div class="container">
			<div class="row">
				<div
					class="col"
					:class="awards ? '' : 'col_full'"
				>
					<div class="breadcrumbs">
						<BaseBreadcrumbs
							:breadcrumbs="breadcrumbs"
						></BaseBreadcrumbs>
					</div>

					<h1 class="title">{{ title }}</h1>

					<div
						v-if="text"
						class="text"
						v-html="text"
					></div>

					<div class="btn">
						<BaseButton @click="onShowPopup">
							Получить коммерческое предложение
						</BaseButton>
					</div>
				</div>
				<div
					v-if="awards"
					class="col"
				>
					<div class="awards">
						<div
							v-for="(award, index) in awards"
							:key="index"
							class="award"
						>
							<BaseAwardVertical :data="award" />
						</div>
					</div>
				</div>
			</div>
			<div
				v-if="menuItems"
				class="bottom"
			>
				<div
					v-if="menuTitle"
					class="menu-title"
				>
					{{ menuTitle }}
				</div>

				<div class="menu-items">
					<BaseMenuList :data="menuItems" />
				</div>
			</div>
		</div>

		<ComercialPopup
			:show="isShowPopup"
			@close="onClosePopup"
		/>
	</section>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { ref, computed } from 'vue';
	import type { BaseServiceInfoType } from './type';
	import BaseBreadcrumbs from '@/components/base-breadcrumbs';
	import BaseButton from '@/components/base-button';
	import BaseAwardVertical from '@/components/base-award-vertical';
	import BaseMenuList from '@/components/base-menu-list';
	import ComercialPopup from '@/components/comercial-popup';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseServiceInfoType>,
			required: true,
		},
	});

	const breadcrumbs = computed(() => {
		return props.data.breadcrumbs;
	});

	const title = computed(() => {
		return props.data.name;
	});

	const text = computed(() => {
		return props.data.description;
	});

	const menuTitle = computed(() => {
		return props.data.menu_title || null;
	});

	const menuItems = computed(() => {
		const menu = props.data.menu;
		const hasMenu = menu && menu.length;

		return hasMenu
			? {
					items: menu,
				}
			: null;
	});

	const awards = computed(() => {
		const awards = props.data.awards?.items;
		const hasAwards = props.data.awards?.items?.length;

		return hasAwards ? awards : null;
	});

	const isShowPopup = ref(false);

	const onShowPopup = () => {
		isShowPopup.value = true;
	};

	const onClosePopup = () => {
		isShowPopup.value = false;
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>

<!--
<template>
	<div class="services-info">
		<container>
			<div class="row">
				<div class="col" :class="awardsItems ? '' : 'col_full'">
					<BreadCrubms
						:propsData="breadcrumbs"
					/>
					<Title class="title-inner" :setHowH1Tag="true" :text="h1" />
					<div
						class="text"
						v-if="description"
						v-html="description"
					></div>
					<div class="menu-title" v-if="menuTitle">
						{{ menuTitle }}
					</div>
					<div class="menu-list" v-if="menu">
						<ul>
							<li v-for="item in menu" :key="item.id">
								<nuxt-link :to="item.link">
									<span>
										{{ item.name }}
									</span>
								</nuxt-link>
							</li>
						</ul>
					</div>
					<GetComOfferBtn class="offer-btn"
						>Получить коммерческое предложение</GetComOfferBtn
					>
				</div>
				<div class="col" v-if="awardsItems && awardsItems.length">
					<div class="awards">
						<div
							class="col"
							v-for="item in awardsItems"
							:key="item.id"
						>
							<AwardsItem
								:src="item.picture"
								:name="item.name"
								:text="item.text"
							/>
						</div>
					</div>
				</div>
			</div>
		</container>
	</div>
</template>

<script>
import BreadCrubms from "Comp/breadcrumbs/breadcrumbs";
import Title from "Comp/title/title";
import AwardsItem from "Comp/awards/awards/awards-item";
import GetComOfferBtn from "Comp/get-com-offer-btn.vue";

export default {
	props: {
		propsData: {
			type: Object,
		},
		title: {
			type: String,
		},
	},
	components: {
		BreadCrubms,
		Title,
		AwardsItem,
		GetComOfferBtn,
	},
	computed: {
		awardsItems() {
			return this.propsData.awards && this.propsData.awards.items
				? this.propsData.awards.items
				: [];
		},
	},
	methods: {
		showPopup() {
			this.$eventBusModal.$emit("modal-loading");

			const promiseFirst = import(
				"Comp/comercial-popup/comercial-popup.vue"
			);
			const promiseSecond = this.$axios.get("/form/offer/");

			Promise.all([promiseFirst, promiseSecond])
				.then(([promiseFirst, promiseSecond]) => {
					this.$eventBusModal.$emit("modal-open", {
						component: promiseFirst.default,
						componentsData: promiseSecond.data,
					});
				})
				.catch((err) => {
					this.$eventBusModal.$emit("modal-close");
					console.error(err);
					alert(
						"Произошла ошибка при загрузке попапа. Повторите пожалуйста попытку позже",
					);
				});
		},
	},
};
</script>

<style lang="scss" scoped src="./services-info.scss">
</style> -->
