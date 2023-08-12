import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
} from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
  presets: [
    presetUno(),
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
    // Buttons
    [/^btn-(.*)$/, ([, c]) => `bg-${c}-400 text-${c}-950 py-2 px-4 rounded-lg hover:(bg-${c}-300) active:(bg-${c}-500) disabled:(bg-${c}-800 text-${c}-100)`],
  ],
  safelist: ['h-full', 'bg-white', 'text-base', 'antialiased', 'flex', 'min-h-full', 'flex-col']
})
