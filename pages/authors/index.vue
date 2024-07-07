<template>
	<div class="page-top">
		<BasePageTop
			:data="pageTopData"
			:modifier-classes="['fs-small']"
			@button-clicked="onSubscribeBtnClicked"
		/>
	</div>

	<div
		ref="authorsEl"
		class="authors"
	>
		<template
			v-for="(item, index) in authors"
			:key="index"
		>
			<div class="author">
				<div class="author__content">
					<div class="author__pic">
						<img
							v-lazy
							:data-src="item.picture"
							alt="pic"
						/>
					</div>
					<div class="author__desc">
						<div class="author__name">{{ item.name }}</div>
						<div class="author__position">
							{{ item.position }}
						</div>
						<div class="author__experience">
							{{ item.experience }} опыта
						</div>
					</div>

					<div class="author__hover">
						<div class="author__hover-top">
							<div
								v-if="item.cases || item.blog"
								class="author__links"
							>
								<span
									v-if="item.cases"
									class="author__link"
									@click="toCases(item)"
								>
									{{ item.cases.title }}
								</span>
								<span
									v-if="item.blog"
									class="author__link"
									@click="toBlog(item)"
								>
									{{ item.blog.title }}
								</span>
							</div>
							<div class="author__btn">
								<BaseButton
									:modifier-classes="[
										'without-default-hover',
									]"
									theme="seventh"
									@click="onShowPopup"
								>
									обсудить проект
								</BaseButton>
							</div>
						</div>
						<div class="author__hover-bottom">
							<NuxtLink
								:to="item.link"
								class="author__name"
							>
								{{ item.name }}
							</NuxtLink>
							<div class="author__position">
								{{ item.position }}
							</div>
							<div class="author__experience">
								{{ item.experience }} опыта
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				v-if="index === 11 && subscribeFormData"
				ref="subscribeFormEl"
				class="subscribe-form"
			>
				<BaseSubscribeForm :data="subscribeFormData" />
			</div>
		</template>

		<BaseSubscribePopup
			v-if="subscribeFormData"
			:data="subscribeFormData"
			:show="isShowPopupSubscribe"
			@close="onClosePopupSubscribe"
		/>

		<ComercialPopup
			:show="isShowPopup"
			@close="onClosePopup"
		/>
	</div>
</template>

<script setup lang="ts">
	import { ref, shallowRef, computed, onMounted } from 'vue';
	import type {
		AuthorsPageType,
		AuthorsPageNavType,
		AuthorsPageItemsType,
	} from '@/types/pages/authors-page';
	import type { FormType } from '@/types/forms';
	import { scrollTo } from '@/utils/ui';
	import { useMetaStore } from '@/stores/meta';
	import { SUBSCRIBE_FORM_URL } from '@/constants';
	import { handleError } from '@/helpers/handle-error';
	import { useApiFetch } from '@/composables/use-api-fetch';
	import { useAuthorFilter } from '@/composables/use-author-filter';
	import { useInfinityScroll } from '@/composables/use-infinity-scroll';
	import BasePageTop from '@/components/base-page-top';
	import BaseButton from '@/components/base-button';
	import BaseSubscribeForm from '@/components/base-form-subscribe';
	import BaseSubscribePopup from '@/components/base-subscribe-popup';
	import ComercialPopup from '@/components/comercial-popup';

	const { data, error } = await useApiFetch<AuthorsPageType>('page/authors');

	if (!data.value) {
		throw handleError({
			statusCode: error.value?.statusCode || 500,
			fatal: true,
			error: error.value,
		});
	}

	const subscribeFormData = ref<
		FormType & { name: string; caption: string; button_name: string }
	>();

	const { data: formData } = await useApiFetch<FormType>(SUBSCRIBE_FORM_URL);

	if (formData.value) {
		subscribeFormData.value = {
			...formData.value,
			name: 'Подпишитесь на новости и получите чек-лист по аналитике',
			caption: `Получайте последние новости интернет-маркетинга.
					  <br>
					  А в качестве бонуса дарим бесплатный чек-лист по аналитике.`,
			button_name: 'Подписаться на рассылку',
		};
	}

	const { setMeta } = useMetaStore();

	const meta = data.value.page.meta;

	setMeta(meta);

	const content = data.value.page.content[0];
	const count = ref(content.count);
	const newCount = ref(content.last_month_count);

	const pageTopData = computed(() => {
		return {
			title: meta.h1,
			breadcrumbs: content.breadcrumbs,
			count: count.value,
			new_count: newCount.value,
			button_name: subscribeFormData.value ? 'Подписаться' : null,
		};
	});

	const getNextUrlFromNavigation = (
		navigation: AuthorsPageNavType['nav'],
	) => {
		return navigation?.next_page_url
			? navigation.next_page_url.replace('/api/v1', '')
			: null;
	};

	const authors = shallowRef(content.items);
	const authorsEl = ref<HTMLElement>();
	const nextPageUrl = ref(getNextUrlFromNavigation(content.nav));

	const isShowPopupSubscribe = ref(false);
	// сделал массиовом так как ссылается внутри v-for
	const subscribeFormEl = ref<HTMLElement[]>();

	const onShowPopupSubscribe = () => {
		isShowPopupSubscribe.value = true;
	};

	const onClosePopupSubscribe = () => {
		isShowPopupSubscribe.value = false;
	};

	const onSubscribeBtnClicked = () => {
		const form = subscribeFormEl.value;

		if (form && form[0]) {
			scrollTo({
				to: form[0],
			});
		} else {
			onShowPopupSubscribe();
		}
	};

	const isShowPopup = ref(false);

	const onShowPopup = () => {
		isShowPopup.value = true;
	};

	const onClosePopup = () => {
		isShowPopup.value = false;
	};

	const fieldName = 'filter[author]';
	const { setFilterAndPush } = useAuthorFilter();

	const toCases = (item: AuthorsPageItemsType['items'][0]) => {
		setFilterAndPush(
			{
				name: item.cases!.title,
				field_name: fieldName,
				field_value: item.id,
			},
			'/cases/',
		);
	};

	const toBlog = (item: AuthorsPageItemsType['items'][0]) => {
		setFilterAndPush(
			{
				name: item.blog!.title,
				field_name: fieldName,
				field_value: item.id,
			},
			'/blog/',
		);
	};

	const infinityScroll = useInfinityScroll();

	onMounted(() => {
		const element = authorsEl.value;

		if (element) {
			infinityScroll<AuthorsPageItemsType & AuthorsPageNavType>({
				element,
				url: nextPageUrl,
				onSuccess: (data) => {
					authors.value = [...authors.value, ...data.items];
					nextPageUrl.value = getNextUrlFromNavigation(data.nav);
				},
				onError: (error) => {
					// fix me to notify
					// eslint-disable-next-line no-console
					console.error(error);
				},
			});
		}
	});
</script>

<style scoped lang="scss" src="./index.scss"></style>
