import { createPlugin } from 'windy-radix-palette';

const colors = createPlugin();

/** @type {import("tailwindcss").Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark'],
	theme: {
		extend: {
			colors: {
				// Brand
				primary: colors.alias('purple'),

				// Semantic
				success: colors.alias('green'),
				warning: colors.alias('yellow'),
				danger: colors.alias('red'),
				info: colors.alias('blue'),

				// Grayscale
				neutral: colors.alias('mauve'),

				// Text
				'high-contrast': colors.alias('mauve', 12),
				'low-contrast': colors.alias('mauve', 11)
			}
		}
	},
	plugins: [colors.plugin, require('@tailwindcss/typography')]
};
