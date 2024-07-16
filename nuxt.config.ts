import postcssPxToViewportWithMinWidth from 'postcss-px-to-viewport-with-min-width';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	app: {
		head: {
			htmlAttrs: {
				lang: 'ru',
			},
		},
	},
	hooks: {
		'pages:extend': (pages) => {
			pages.push({
				name: 'subBlog',
				path: '/blog/:subBlog',
				file: '@/pages/blog/index.vue',
			});

			pages.push({
				name: 'subGlossary',
				path: '/glossary/:subGlossary',
				file: '@/pages/glossary/index.vue',
			});
		},
	},
	/*
	 ** Disable Auto Imports Components
	 */
	imports: {
		autoImport: false,
	},
	components: {
		dirs: [],
	},
	/*
	 ** Global CSS
	 */
	css: [
		'modern-normalize/modern-normalize.css',
		'@/assets/scss/base/fonts.scss',
		'@/assets/scss/base/base.scss',
		'@/assets/scss/base/animate.scss',
		'@/assets/scss/c-orange.scss', // fix me remove me
	],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
						@import "@/assets/scss/base/mixins/hover.scss";
						@import "@/assets/scss/base/mixins/media.scss";
						@import "@/assets/scss/base/mixins/loading.scss";
						@import "@/assets/scss/base/variables.scss";
						@import "@/assets/scss/base/svg-icon.scss";
					`,
				},
			},
			postcss: {
				plugins: [
					postcssPxToViewportWithMinWidth({
						viewportWidth: 1600,
						unitWidthCssVar: 'var(--vw, 1vw)',
					}),
				],
			},
		},
	},
	modules: ['@pinia/nuxt'],
	runtimeConfig: {
		public: {
			apiUrl: process.env.API_URL,
			siteUrl: process.env.SITE_URL,
			isDev: process.env.NODE_ENV !== 'production',
		},
	},
	typescript: {
		tsConfig: {
			compilerOptions: {
				paths: {
					'@/components/*': [
						'../components/*',
						'../components/*/index.vue',
					],
				},
			},
		},
	},
	experimental: {
		appManifest: false,
	},
	build: {
		transpile: ['swiper', '@fancyapps/ui'],
	},
});
