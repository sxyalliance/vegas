import type { ClientConfig } from '$lib/notion/client';
import { extractor } from '$lib/notion/extend/event';

interface Config {
	clients: {
		[key: string]: ClientConfig;
	};
}

export const config: Config = {
	clients: {
		event: {
			integrationSecret: 'secret_SSIPpymveUd3gSYyFQarQFzNVWNfoHq56cN9AfDyKXe',
			databaseId: '2342ff8d6c2b4654a29ed5994435fcd0',
			extractor: extractor
		}
	}
};
