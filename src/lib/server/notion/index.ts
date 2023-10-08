import { getBlocks, getDatabaseById, getPageByCriteria, getPageById } from '$lib/server/notion/api';
import type { PageQueryCriteria } from '$lib/server/notion/api';
import type {
	BlockObjectResponse,
	PageObjectResponse
} from '@notionhq/client/build/src/api-endpoints';
import type { PostPropertiesExtractor } from '$lib/server/notion/types';
import { getClient } from '$lib/server/notion/client';
import { err, ok } from 'neverthrow';
import type { StandardResult } from '$lib/shared/types/error';

export const getAllPosts = async <T>(alias: string): Promise<StandardResult<T[]>> => {
	const client = getClient(alias);

	const res = await getDatabaseById(client);

	if (res.isErr()) {
		return err({ code: res.error.code, message: res.error.message || 'Cannot reach Notion API' });
	}

	if (res.value.length === 0) {
		return err({ code: 400, message: 'Please add rows in the database' });
	}

	const pages = res.value;
	const extracted = await Promise.all(
		pages.map((page) =>
			extractPropertiesFromPage<T>(page, client.config.extractor as PostPropertiesExtractor<T>)
		)
	);
	const filtered = extracted.filter((page) => !!page) as T[];

	return ok(filtered);
};

export const getPostByCriteria = async <T>(
	alias: string,
	criteria: PageQueryCriteria
): Promise<StandardResult<{ blocks: BlockObjectResponse[]; properties: T }>> => {
	const client = getClient(alias);

	const response = await getPageByCriteria(client, criteria);

	if (response.isErr()) {
		return err({ code: response.error.code, message: response.error.message });
	}
	if (response.value.length === 0) {
		return err({ code: 404, message: 'Not found' });
	}

	const page = response.value[0];
	if (!page?.id) {
		return err({ code: 500, message: 'Invalid or missing page!' });
	}

	const blockResponse = await getBlocks(client, page.id);
	if (blockResponse.isErr()) {
		return err({ code: blockResponse.error.code, message: blockResponse.error.message });
	}

	const properties = await extractPropertiesFromPage<T>(
		page,
		client.config.extractor as PostPropertiesExtractor<T>
	);

	if (properties === null) {
		return err({ code: 404, message: 'Not found' });
	}

	return ok({
		blocks: blockResponse.value,
		properties
	});
};

export const getPostById = async <T>(
	alias: string,
	pageId: string
): Promise<StandardResult<{ blocks: BlockObjectResponse[]; properties: T }>> => {
	const client = getClient(alias);

	const page = await getPageById(client, pageId);

	if (page.isErr()) {
		return err({ code: 404, message: 'Not found' });
	}

	const blockResponse = await getBlocks(client, pageId);
	if (blockResponse.isErr()) {
		return err({ code: blockResponse.error.code, message: blockResponse.error.message });
	}

	const properties = await extractPropertiesFromPage<T>(
		page.value,
		client.config.extractor as PostPropertiesExtractor<T>
	);

	if (properties === null) {
		return err({ code: 404, message: 'Not found' });
	}

	return ok({
		blocks: blockResponse.value,
		properties
	});
};

const extractPropertiesFromPage = async <T>(
	page: PageObjectResponse,
	extractor: PostPropertiesExtractor<T>
): Promise<T | null> => {
	return await extractor.extract(page);
};
