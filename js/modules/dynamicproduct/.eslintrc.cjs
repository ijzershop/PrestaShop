module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
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
	],
	rules: {
		'svelte/no-at-html-tags': 'off',
		'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
		'@typescript-eslint/ban-ts-comment': 'off',
		'no-undef': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_'
			}
		],
		'no-restricted-syntax': [
			'warn',
			{
				message: '$inspect is not allowed',
				selector: "CallExpression[callee.name='$inspect']"
			},
			{
				message: 'it.only is not allowed',
				selector: "MemberExpression[object.name='it'][property.name='only']"
			}
		]
	}
};
