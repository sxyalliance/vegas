import { Client as NotionClient } from '@notionhq/client';

import type { PostPropertiesExtractor } from '$lib/server/notion/types';

export type ClientConfig = {
	integrationSecret: string;
	databaseId: string;
	extractor: PostPropertiesExtractor<unknown>;
};

export type Client = {
	sdk: NotionClient;
	config: ClientConfig;
};

export const constructClient = (config: ClientConfig): Client => {
	const sdk = new NotionClient({
		auth: config.integrationSecret
	});
	return { sdk, config };
};
