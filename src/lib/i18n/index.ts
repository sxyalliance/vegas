import {browser} from '$app/environment'
import {init, register, locales as localesStore} from 'svelte-i18n'
import {get} from "svelte/store";

const defaultLocale = 'en'

export const resolveFirstAvailableLocale = (locales: readonly string[]): string => {
  const availableLocales = get(localesStore)
  for (const locale of locales) {
    // remove part of priority string after ';'
    const localeWithoutPriority = locale.split(';')[0]
    if (availableLocales.includes(localeWithoutPriority)) {
      return localeWithoutPriority
    }
  }
  return defaultLocale
}

register('en', () => import('./locales/en.json'))
register('zh-CN', () => import('./locales/zh-CN.json'))

init({
  fallbackLocale: defaultLocale,
  initialLocale: browser ? resolveFirstAvailableLocale(window.navigator.languages) : defaultLocale,
})
