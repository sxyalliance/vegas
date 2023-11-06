import { sequence } from '@sveltejs/kit/hooks';

// import * as Sentry from '@sentry/sveltekit';
import SuperTokensError from 'supertokens-node/lib/build/error';
import SuperTokens from 'supertokens-node/lib/build/supertokens';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import Session from 'supertokens-node/recipe/session';
import { sitemapHook } from 'sveltekit-sitemap';
import { createTRPCHandle } from 'trpc-sveltekit';

import config from '$lib/server/config';
import { authCookieNames } from '$lib/server/supertokens/cookie';
import { constructDirectus } from '$lib/shared/directus/client';
import { localePreference, resolveFirstAvailableLocale } from '$lib/shared/i18n';
import * as seoSites from '$lib/shared/seo/sites';
import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';

import { sitemap } from './sitemap';

import type { Handle } from '@sveltejs/kit';

// Blocked by: https://github.com/getsentry/sentry-javascript/issues/8291
// Sentry.init({
// 	dsn: 'https://d0d7d2be65f2a949deeacc88600dca80@o4506100443119616.ingest.sentry.io/4506100444692480',
// 	tracesSampleRate: 1
// });

SuperTokens.init({
	supertokens: {
		connectionURI: config.get('auth.supertokens.url'),
		apiKey: config.get('auth.supertokens.apiKey')
	},
	appInfo: {
		appName: 'Vegas',
		websiteDomain: config.get('app.url'),
		apiDomain: config.get('app.url'),
		apiBasePath: '/auth'
	},
	recipeList: [EmailPassword.init(), Session.init()]
});

const handleSuperTokens = (async ({ event, resolve }) => {
	try {
		const accessToken = event.cookies.get(authCookieNames.access) ?? '';
		const antiCsrfToken = event.cookies.get(authCookieNames.csrf);
		const session = await Session.getSessionWithoutRequestResponse(accessToken, antiCsrfToken);
		const userId = session.getUserId();

		event.locals.user = { id: userId };
		return resolve(event);
	} catch (error) {
		if (!SuperTokensError.isErrorFromSuperTokens(error)) {
			return new Response('An unexpected error occurred', { status: 500 });
		}

		const userNeedsSessionRefresh = error.type === Session.Error.TRY_REFRESH_TOKEN;

		event.locals.user = {};
		return resolve(event);
	}
}) satisfies Handle;

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
	handleSuperTokens,
	createTRPCHandle({ router, createContext }),
	sitemapHook(sitemap, {
		getRobots: seoSites.getRobots,
		getRoutes: seoSites.getRoutes
	})
);
// export const handleError = Sentry.handleErrorWithSentry();
