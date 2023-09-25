import { defineConfig, presetIcons, presetTypography, presetUno, presetWebFonts } from "unocss";
import transformerVariantGroup from '@unocss/transformer-variant-group';
import { presetRadix } from 'unocss-preset-radix';
import { presetHeroPatterns } from '@julr/unocss-preset-heropatterns';
import type { RadixColors } from "unocss-preset-radix/dist/radix";

const colorPalette: readonly RadixColors[] = ['indigo', 'slate', 'ruby', 'teal', 'amber', 'sky', 'pink'];

export default defineConfig({
	presets: [
		presetUno(),
		presetRadix({
			palette: colorPalette,
			aliases: {
				primary: 'indigo',
				natural: 'slate',
				error: 'ruby',
				success: 'teal',
				warning: 'amber',
				info: 'sky'
			}
		}),
		presetIcons({
			prefix: 'i-',
			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle'
			}
		}),
		presetHeroPatterns(),
		presetTypography(),
		presetWebFonts({
			fonts: {
				// these will extend the default theme
				// sans: 'Roboto',
				mono: ['Fira Code', 'Fira Mono:400,700']
			}
		})
	],
	transformers: [transformerVariantGroup()],
	shortcuts: [
		// === Buttons ===
		// Size
		[/^btn-(xs|sm)$/, ([, c]) => `rounded px-2 py-1 text-${c}`],
		[/^btn-(md)$/, () => `rounded-md px-2.5 py-1.5 text-sm`],
		[/^btn-(lg)$/, () => `rounded-md px-3 py-2 text-sm`],
		[/^btn-(xl)$/, () => `rounded-md px-3.5 py-2.5 text-sm`],

		// Variant
		[
			/^btn-(primary)$/,
			() =>
				`hue-primary bg-primary10 font-semibold text-hue-fg shadow-sm hover:bg-primary9 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary10`
		],
		[
			/^btn-(secondary)$/,
			() =>
				`bg-white font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`
		],
		[/^btn-(soft)$/, () => `hue-primary bg-hue5 font-semibold text-hue11 shadow-sm hover:bg-hue6`],

		// === Badges ===
		// Variant
		[
			/^badge-flat-(.*)$/,
			([, c]) =>
				`hue-${c} inline-flex items-center rounded-md bg-hue5 px-2 py-1 text-xs font-medium text-hue11`
		]
	],
	safelist: [
		'h-full',
		'text-base',
		'antialiased',
		'flex',
		'min-h-full',
		'flex-col',
		'hue-natural',
		'absolute',
		...colorPalette.map((c) => `text-${c}10`)
	]
});
