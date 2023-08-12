import {sveltekit} from '@sveltejs/kit/vite';
import UnoCSS from '@unocss/svelte-scoped/vite'
import {defineConfig} from 'vitest/config';

export default defineConfig({
  plugins: [
    UnoCSS({
      injectReset: '@unocss/reset/tailwind.css',
      // ...other Svelte Scoped options
    }),
    sveltekit()
  ],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});
