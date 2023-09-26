import { createLogWriter } from '@roarr/browser-log-writer';
import { browser, dev } from '$app/environment';
import { SuperLogger } from '$lib/logging/logger';

globalThis.ROARR = globalThis.ROARR ?? {};

if (browser) {
	globalThis.ROARR.write = createLogWriter();
	if (dev && localStorage.storable) {
		localStorage.setItem('ROARR_LOG', 'true');
	}
}

SuperLogger.info(
	{
		application: __APPNAME__,
		version: __VERSION__,
		lastmod: __LASTMOD__,
		environment: dev ? 'development' : 'production',
		browser: browser ? 'browser' : 'node'
	},
	'Application started'
);
