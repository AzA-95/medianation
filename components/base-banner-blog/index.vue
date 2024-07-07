<template>
	<section class="base-banner-blog">
		<div class="container">
			<div class="content">
				<div class="pic">
					<img
						:src="picture"
						:alt="title"
					/>
				</div>
				<div class="breadcrumbs">
					<BaseBreadcrumbs
						:breadcrumbs="breadcrumbs"
						:modifier-classes="['white', 'slash']"
					/>
				</div>
				<div
					class="title-with-tags"
					:class="author ? 'title-with-tags_width-small' : ''"
				>
					<h1 class="title">
						{{ title }}
					</h1>
					<div
						v-if="tags"
						class="tags"
					>
						<span
							v-for="(tag, index) in tags"
							:key="index"
							class="tag"
						>
							#{{ tag }}
						</span>
					</div>
				</div>
				<div
					class="bottom"
					:class="author ? 'bottom_width-small' : ''"
				>
					<div class="social-links">
						<div class="social-links__title">Поделиться:</div>
						<div class="social-links__items">
							<div
								v-for="(item, index) in shareSocialsData"
								:key="index"
								class="social-links__link"
							>
								<BaseShareSocialBtn :data="item">
									<BaseIcon :name="`svg/${item.iconName}`" />
								</BaseShareSocialBtn>
							</div>
							<div class="social-links__copy">
								<BaseShareCopyBtn
									:text="shareSocialsData[0].url"
								/>
							</div>
						</div>
					</div>

					<div class="info">
						<span class="date">
							<span class="date-published">
								{{ datePublished }}
							</span>
							<span class="date-modified">
								{{ dateModified }}
							</span>
						</span>
						<span
							v-if="showCount"
							class="watched"
						>
							{{ showCount }}
						</span>
						<span
							v-if="readingTime"
							class="read-time"
						>
							{{ readingTime }}
						</span>
					</div>
				</div>
			</div>
		</div>
		<div
			v-if="author"
			class="author"
		>
			<div class="author__photo">
				<img
					:src="author.picture"
					alt="author"
				/>
				<img
					v-if="author.picture_ex"
					:src="author.picture_ex"
					alt="author"
				/>
			</div>
			<div class="author__desc">
				<div
					class="author__name"
					:class="{
						'author__name_with-arrow':
							author.is_show_detail && author.link,
					}"
				>
					Рассказывает
					<br />
					{{ author.name }}
				</div>
				<div class="author__position">
					{{ author.position }}
				</div>
				<div
					v-if="author.experience"
					class="author__experience"
				>
					{{ author.experience }}
				</div>
			</div>
			<NuxtLink
				v-if="author.is_show_detail && author.link"
				:to="author.link"
				class="author__full-link"
			></NuxtLink>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import type { PropType } from 'vue';
	import type { BaseType } from './type';
	import { rusWordEnding } from '@/utils/common';
	import BaseBreadcrumbs from '@/components/base-breadcrumbs';
	import BaseShareSocialBtn from '@/components/base-share-social-btn';
	import BaseIcon from '@/components/base-icon';
	import BaseShareCopyBtn from '@/components/base-copy-btn';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const picture = computed(() => {
		return props.data.picture;
	});

	const title = computed(() => {
		return props.data.name;
	});

	const breadcrumbs = computed(() => {
		return props.data.breadcrumbs;
	});

	const tags = computed(() => {
		return props.data.tags;
	});

	const getNotmalizedDate = (date: string) => {
		// format of argument date is year-month-day 2024-03-31
		const monthNames = [
			'января',
			'февраля',
			'марта',
			'апреля',
			'мая',
			'июня',
			'июля',
			'августа',
			'сентября',
			'октября',
			'ноября',
			'декабря',
		];

		const [year, month, day] = date.split('-');
		const monthIndex = parseInt(month);

		return `${day} ${monthNames[monthIndex - 1]} ${year} г.`;
	};

	const datePublished = computed(() => {
		return getNotmalizedDate(props.data.date_published);
	});

	const dateModified = computed(() => {
		const date = getNotmalizedDate(props.data.date_modified);

		if (date === datePublished.value) return null;

		return `Обновлено: ${date}`;
	});

	const readingTime = computed(() => {
		const text = props.data.reading_time;

		if (text) {
			return `${text} на чтение`;
		}

		return null;
	});

	const showCount = computed(() => {
		const count = props.data.show_count;

		if (count) {
			const text = rusWordEnding(
				count,
				'просмотр',
				'просмотра',
				'просмотров',
			);

			return `${count} ${text}`;
		}

		return null;
	});

	const author = computed(() => {
		if (props.data.author) {
			const authorData = { ...props.data.author };

			authorData.experience = authorData.experience
				? `${authorData.experience} опыта`
				: null;

			return authorData;
		}

		return null;
	});

	const shareSocialsData = computed(() => {
		const data = props.data.share_socials_data;

		return [
			{
				...data,
				network: 'vk' as const,
				iconName: 'vk-square',
				share_text: 'Поделиться в вконтакте',
			},
			{
				...data,
				network: 'telegram' as const,
				iconName: 'telegram-circle',
				share_text: 'Поделиться в телеграме',
			},
			{
				...data,
				network: 'linkedin' as const,
				iconName: 'linkedin',
				share_text: 'Поделиться в линкедине',
			},
		];
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
