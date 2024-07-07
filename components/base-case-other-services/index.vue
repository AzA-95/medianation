<template>
	<div
		v-if="cases"
		class="base-case-other-services"
	>
		<div class="container">
			<div class="row">
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
						v-if="client.name || (client.link && client.link_name)"
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
				<div class="cases">
					<div class="cases__caption">{{ cases.title }}</div>
					<div class="cases__row">
						<div
							v-for="(item, index) in cases.items"
							:key="index"
							class="cases__item"
						>
							<nuxt-link
								:to="item.link"
								class="cases__link"
							>
								{{ item.name }}
							</nuxt-link>
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

	const cases = computed(() => {
		const cases = props.data.client;

		if (cases && cases.other_cases) {
			const items =
				cases.other_cases.length > 3
					? cases.other_cases.slice(2)
					: cases.other_cases;

			return {
				title: cases.other_cases_title,
				items,
			};
		}

		return null;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
