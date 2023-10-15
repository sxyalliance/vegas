import { createPlugin } from 'windy-radix-palette';

const colors = createPlugin();

/** @type {import("tailwindcss").Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark', { pattern: /(text|bg|border)-(.+)-9/ }],
	theme: {
		extend: {
			colors: {
				// Brand
				accent: colors.alias('purple'),
				accentA: colors.alias('purpleA'),

				// Semantic
				success: colors.alias('green'),
				successA: colors.alias('greenA'),
				warning: colors.alias('yellow'),
				warningA: colors.alias('yellowA'),
				danger: colors.alias('red'),
				dangerA: colors.alias('redA'),
				info: colors.alias('blue'),
				infoA: colors.alias('blueA'),

				// Grayscale
				neutral: colors.alias('mauve'),
				neutralA: colors.alias('mauveA'),

				// Text
				'high-contrast': colors.alias('mauve', 12),
				'low-contrast': colors.alias('mauve', 11)
			},
			spacing: {
				17: '4.25rem',
				26: '6.5rem'
			}
		}
	},
	plugins: [colors.plugin, require('@tailwindcss/typography')]
};
