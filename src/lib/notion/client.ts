import { Client as NotionClient } from '@notionhq/client';
import { config } from '$lib/notion/config';
import type { PostPropertiesExtractor } from '$lib/notion/types';

export type ClientConfig = {
	integrationSecret: string;
	databaseId: string;
	extractor: PostPropertiesExtractor<unknown>;
};

export type Client = {
	sdk: NotionClient;
	config: ClientConfig;
};

const clientInstances = new Map<string, Client>();

const constructClient = (config: ClientConfig, alias: string): Client => {
	if (clientInstances.has(alias)) {
		return clientInstances.get(alias) as Client;
	}

	const sdk = new NotionClient({
		auth: config.integrationSecret
	});
	const client: Client = { sdk, config };
	clientInstances.set(alias, client);
	return client;
};

export const getClient = (alias: string): Client => {
	if (clientInstances.has(alias)) {
		return clientInstances.get(alias) as Client;
	} else {
		if (config.clients[alias]) {
			return constructClient(config.clients[alias], alias);
		}
		throw new Error(`No client registered with alias ${alias}`);
	}
};
