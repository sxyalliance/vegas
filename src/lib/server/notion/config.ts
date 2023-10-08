import type { ClientConfig } from '$lib/server/notion/client';

interface Config {
	clients: {
		[key: string]: ClientConfig;
	};
}

export const config: Config = {
	clients: {}
};

export const registerClient = (alias: string, clientConfig: ClientConfig) => {
	config.clients[alias] = clientConfig;
};
