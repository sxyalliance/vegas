import { createLogWriter } from '@roarr/browser-log-writer';
import { browser, dev } from '$app/environment';
import { SuperLogger } from '$lib/shared/logging/logger';
import { version } from '$lib/shared/shared/version';

declare const __APPNAME__: string;

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
		version: version,
		environment: dev ? 'development' : 'production',
		browser: browser ? 'browser' : 'node'
	},
	'Application started'
);
