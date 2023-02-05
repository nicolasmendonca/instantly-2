module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['svelte3', '@typescript-eslint', 'square-svelte-store'],
	ignorePatterns: ['*.cjs'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	rules: {
		'square-svelte-store/use-square-svelte-stores': 'error',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/ban-ts-comment': 'off'
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
