<template>
	<div class="case-top">
		<div
			v-if="client || task"
			class="client-with-task"
		>
			<div class="container">
				<div class="client-with-task__row">
					<div
						v-if="client"
						class="client"
					>
						<div
							v-if="client.picture"
							class="client__pic"
							:style="`
								--img-width: ${client.picture_params!.width};
								--img-height: ${client.picture_params!.height};
							`"
						>
							<img
								v-lazy
								:data-src="client.picture"
								:width="client.picture_params!.width"
								:height="client.picture_params!.height"
								alt="client"
							/>
						</div>
						<div
							v-if="
								client.name || (client.link && client.link_name)
							"
							class="client__info"
						>
							<a
								v-if="client.link && client.link_name"
								:href="client.link"
								target="_blank"
								class="client__link"
							>
								{{ client.link_name }}
							</a>
							<div
								v-else-if="client.name"
								class="client__name"
							>
								{{ client.name }}
							</div>
						</div>
					</div>
					<div
						v-if="task"
						class="task"
					>
						<h2
							v-if="task.title"
							class="task__title"
						>
							{{ task.title }}
						</h2>
						<div
							class="task__text"
							v-html="task.text"
						></div>
					</div>
				</div>
			</div>
		</div>
		<div
			v-if="kpi"
			class="kpi"
		>
			<div class="container">
				<div
					v-if="kpi.title"
					class="kpi__title"
				>
					{{ kpi.title }}
				</div>
				<div
					v-if="kpi.items"
					class="kpi__list"
				>
					<div
						v-for="(item, index) in kpi.items"
						:key="index"
						class="kpi__item"
					>
						<div
							class="kpi__caption"
							v-html="item.caption"
						></div>
						<div class="kpi__text">{{ item.text }}</div>
					</div>
				</div>
			</div>
		</div>
		<div
			v-if="team"
			class="team"
		>
			<div class="container">
				<div class="team__title">Команда проекта</div>
				<div class="team__list">
					<div
						v-for="(item, index) in team"
						:key="index"
						class="team__item"
					>
						<div class="team__person">
							<div
								v-if="item.picture"
								class="team__person-photo"
							>
								<img
									v-lazy
									:data-src="item.picture"
									alt="person"
								/>
							</div>
							<div class="team__person-desc">
								<nuxt-link
									v-if="item.link && item.is_show_detail"
									:to="item.link"
									class="team__person-name team__person-name_link"
								>
									{{ item.name }}
								</nuxt-link>
								<div
									v-else
									class="team__person-name"
								>
									{{ item.name }}
								</div>

								<div class="team__person-profession">
									{{ item.position }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';
	import type { BaseType } from './type';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const normalizeLink = (link: string) => {
		if (
			link.startsWith('http://') ||
			link.startsWith('https://') ||
			link.startsWith('//')
		) {
			return link;
		}

		return `http://${link}`;
	};

	const client = computed(() => {
		const client = props.data.client;

		if (client) {
			return {
				picture: client.picture,
				picture_params: client.picture_params,
				name: client.name,
				link: client.link ? normalizeLink(client.link) : null,
				link_name: client.link_name,
			};
		}

		return null;
	});

	const task = computed(() => {
		return props.data.task;
	});

	const kpi = computed(() => {
		const features = props.data.features;

		if (features) {
			return {
				title: features.title,
				items: features.items,
			};
		}

		return null;
	});

	const team = computed(() => {
		return props.data.team;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
