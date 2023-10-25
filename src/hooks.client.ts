import { handleErrorWithSentry, Replay } from '@sentry/sveltekit';
import * as Sentry from '@sentry/sveltekit';
import { dev } from '$app/environment';
import { versionIdentifier } from '$lib/shared/shared/version';

if (!dev) {
	Sentry.init({
		dsn: 'https://d0d7d2be65f2a949deeacc88600dca80@o4506100443119616.ingest.sentry.io/4506100444692480',
		tracesSampleRate: 1.0,

		// This sets the sample rate to be 10%. You may want this to be 100% while
		// in development and sample at a lower rate in production
		replaysSessionSampleRate: 1.0,

		// If the entire session is not sampled, use the below sample rate to sample
		// sessions when an error occurs.
		replaysOnErrorSampleRate: 1.0,

		// If you don't want to use Session Replay, just remove the line below:
		integrations: [new Replay()],

		release: versionIdentifier
	});
}

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
