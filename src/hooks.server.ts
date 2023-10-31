import { sequence } from '@sveltejs/kit/hooks';
// import * as Sentry from '@sentry/sveltekit';
import type { Handle } from '@sveltejs/kit';
import { constructDirectus } from '$lib/shared/directus/client';
import { localePreference, resolveFirstAvailableLocale } from '$lib/shared/i18n';
import { sitemapHook } from 'sveltekit-sitemap';
import { sitemap } from './sitemap';
import * as seoSites from '$lib/shared/seo/sites';
import { createTRPCHandle } from 'trpc-sveltekit';
import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';

// Blocked by: https://github.com/getsentry/sentry-javascript/issues/8291
// Sentry.init({
// 	dsn: 'https://d0d7d2be65f2a949deeacc88600dca80@o4506100443119616.ingest.sentry.io/4506100444692480',
// 	tracesSampleRate: 1
// });

export const handle: Handle = sequence(
	/*Sentry.sentryHandle(),*/
	async ({ event, resolve }) => {
		const langs = event.request.headers.get('accept-language')?.split(',');
		if (langs) {
			localePreference.set(resolveFirstAvailableLocale(langs));
		}

		event.locals.directus = constructDirectus(event.fetch);

		return resolve(event, {
			filterSerializedResponseHeaders: (name) => !name.startsWith('x-')
		});
	},
	createTRPCHandle({ router, createContext }),
	sitemapHook(sitemap, {
		getRobots: seoSites.getRobots,
		getRoutes: seoSites.getRoutes
	})
);
// export const handleError = Sentry.handleErrorWithSentry();
