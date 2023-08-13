import type {Handle} from '@sveltejs/kit';
import {locale} from 'svelte-i18n';
import {resolveFirstAvailableLocale} from "$lib/i18n";

export const handle: Handle = async ({event, resolve}) => {

  const langs = event.request.headers.get('accept-language')?.split(',')
  if (langs) {
    locale.set(resolveFirstAvailableLocale(langs))
  }

  const response = await resolve(event, {
    transformPageChunk: ({html}) => html.replace('%unocss-svelte-scoped.global%', 'unocss_svelte_scoped_global_styles'),
  })
  return response
};
