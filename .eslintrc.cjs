module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'prettier'
	],
	rules: {
		'@typescript-eslint/no-unused-vars': 'off',
		'import/no-unresolved': 'off',
		'import/order': [
			'warn',
			{
				groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
				pathGroups: [
					{ pattern: '$lib/**', group: 'internal' },
					{ pattern: '$i18n/**', group: 'internal' },
					{ pattern: '$app/**', group: 'external' },
					{ pattern: '$env/**', group: 'external' }
				],
				'newlines-between': 'always-and-inside-groups',
				alphabetize: { order: 'asc', caseInsensitive: true }
			}
		]
	},
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2022: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	]
};
