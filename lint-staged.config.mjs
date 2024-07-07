export default {
	// 'components/**/*.{ts,scss,vue}':
	// 	'eslint --no-eslintrc -c .eslintrc-structure.json --parser ./node_modules/eslint-plugin-project-structure/dist/parser.js --rule project-structure/file-structure:error',
	// '*.vue': 'npm run clear-shims:vue',
	// '*.{ts,tsx,cts,mts,vue}': () =>
	// 	'vue-tsc --noEmit -p tsconfig.json --composite false',
	// '*.{js,cjs,mjs,ts,tsx,cts,mts,vue}': 'eslint --fix',
	// '*.{css,scss,sass,vue}': 'stylelint --fix',
	'*': 'prettier --ignore-unknown --write',
};
