import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
} from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import {presetRadix} from "unocss-preset-radix";

export default defineConfig({
  presets: [
    presetUno(),
    presetRadix({
      palette: ['indigo', 'slate', 'green'],
      aliases: {
        primary: 'indigo',
        natural: 'slate',
      }
    }),
    presetIcons({
      prefix: 'i-',
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // these will extend the default theme
        // sans: 'Roboto',
        mono: ['Fira Code', 'Fira Mono:400,700'],
      },
    }),
  ],
  transformers: [
    transformerVariantGroup(),
  ],
  shortcuts: [
    // === Buttons ===
    // Size
    [/^btn-(xs|sm)$/, ([, c]) => `rounded px-2 py-1 text-${c}`],
    [/^btn-(md)$/, () => `rounded-md px-2.5 py-1.5 text-sm`],
    [/^btn-(lg)$/, () => `rounded-md px-3 py-2 text-sm`],
    [/^btn-(xl)$/, () => `rounded-md px-3.5 py-2.5 text-sm`],

    // Variant
    [/^btn-(primary)$/, () => `bg-indigo-600 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`],
    [/^btn-(secondary)$/, () => `bg-white font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`],
    [/^btn-(soft)$/, () => `bg-indigo-50 font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100`],

    // === Badges ===
    // Variant
    [/^badge-flat-(.*)$/, ([, c]) => `inline-flex items-center rounded-md bg-${c}-100 px-2 py-1 text-xs font-medium text-${c}-600`],
  ],
  safelist: ['h-full', 'bg-white', 'text-base', 'antialiased', 'flex', 'min-h-full', 'flex-col']
})
