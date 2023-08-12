import type {Handle} from '@sveltejs/kit';
import {locale} from 'svelte-i18n';

export const handle: Handle = async ({event, resolve}) => {

  const lang = event.request.headers.get('accept-language')?.split(',')[0]
  if (lang) {
    locale.set(lang)
  }

  const response = await resolve(event, {
    transformPageChunk: ({html}) => html.replace('%unocss-svelte-scoped.global%', 'unocss_svelte_scoped_global_styles'),
  })
  return response
};
