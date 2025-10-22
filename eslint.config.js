// @ts-check

import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import jest from "eslint-plugin-jest";

export default [
	// Ignore built files and dependencies
	{
		ignores: ["dist", "node_modules"],
	},

	// Main TypeScript + Prettier rules
	{
		files: ["src/**/*.ts"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				sourceType: "module",
				ecmaVersion: "latest",
			},
		},
		plugins: {
			"@typescript-eslint": tseslint,
		},
		rules: {
			...js.configs.recommended.rules,
			...tseslint.configs.recommended.rules,
		},
	},

	// Jest support (test globals + recommended rules)
	{
		files: ["src/**/*.test.ts"],
		plugins: {
			jest,
		},
		languageOptions: {
			globals: {
				...jest.environments.globals.globals,
			},
		},
		rules: {
			...jest.configs["flat/recommended"].rules,
		},
	},

	// Disable rules that conflict with Prettier formatting
	prettier,
];
