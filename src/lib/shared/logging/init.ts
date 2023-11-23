import { browser, dev } from '$app/environment';
import { createLogWriter } from '@roarr/browser-log-writer';

import { SuperLogger } from '$lib/shared/logging/logger';
import { Release } from '$lib/shared/shared/release';

globalThis.ROARR = globalThis.ROARR ?? {};

if (browser) {
	globalThis.ROARR.write = createLogWriter();
	if (dev && localStorage.storable) {
		localStorage.setItem('ROARR_LOG', 'true');
	}
}

SuperLogger.info(
	{
		application: Release.name,
		version: Release.versionIdentifier(),
		environment: dev ? 'development' : 'production',
		browser: browser ? 'browser' : 'node'
	},
	'Application started'
);
