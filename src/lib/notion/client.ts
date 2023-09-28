import { Client as NotionClient } from '@notionhq/client';
import type { PostExtraPropertiesExtractor } from '$lib/notion/types';

export type ClientConfig = {
	integrationSecret: string;
	databaseId: string;
	extractor: PostExtraPropertiesExtractor<any>;
};

export type Client = {
	sdk: NotionClient;
	config: ClientConfig;
};

const clientInstances = new Map<string, Client>();

export const constructClient = (config: ClientConfig, alias: string): Client => {
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
		throw new Error(`No client registered with alias ${alias}`);
	}
};
