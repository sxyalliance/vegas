import {browser} from '$app/environment'
import {init, register} from 'svelte-i18n'

const defaultLocale = 'abstract'

register('en', () => import('./locales/en.json'))
register('abstract', () => import('./locales/abstract.json'))

init({
  fallbackLocale: defaultLocale,
  initialLocale: browser ? window.navigator.language : defaultLocale,
})
