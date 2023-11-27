import { sequence } from '@sveltejs/kit/hooks';

// import * as Sentry from '@sentry/sveltekit';
import { sitemapHook } from 'sveltekit-sitemap';
import { createTRPCHandle } from 'trpc-sveltekit';

import authHook from '$lib/auth/hook.server';
import * as seoSites from '$lib/shared/seo/sites';
import supabaseHook from '$lib/shared/supabase/hook.server';
import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';

import { sitemap } from './sitemap';

import type { Handle } from '@sveltejs/kit';

// Blocked by: https://github.com/getsentry/sentry-javascript/issues/8291
// Sentry.init({
// 	dsn: 'https://d0d7d2be65f2a949deeacc88600dca80@o4506100443119616.ingest.sentry.io/4506100444692480',
// 	tracesSampleRate: 1
// });

export const handle: Handle = sequence(
	/*Sentry.sentryHandle(),*/
	async ({ event, resolve }) => {
		return resolve(event, {
			filterSerializedResponseHeaders: (name) => !name.startsWith('x-')
		});
	},
	supabaseHook,
	authHook,
	createTRPCHandle({ router, createContext }),
	sitemapHook(sitemap, {
		getRobots: seoSites.getRobots,
		getRoutes: seoSites.getRoutes
	})
);
// export const handleError = Sentry.handleErrorWithSentry();
