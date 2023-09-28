import { getBlocks, getDatabaseById, getPageByCriteria } from '$lib/notion/api';
import type { PageQueryCriteria } from '$lib/notion/api';
import type {
	BlockObjectResponse,
	PageObjectResponse
} from '@notionhq/client/build/src/api-endpoints';
import type { PostProperties, PostPropertiesExtractor } from '$lib/notion/types';
import { getClient } from '$lib/notion/client';
import { err, ok } from 'neverthrow';
import type { StandardResult } from '$lib/shared/types/error';

export const getAllPosts = async <T>(
	alias: string
): Promise<StandardResult<PostProperties<T>[]>> => {
	const client = getClient(alias);

	const res = await getDatabaseById(client);

	if (res.isErr()) {
		return err({ code: res.error.code, message: res.error.message || 'Cannot reach Notion API' });
	}

	if (res.value.length === 0) {
		return err({ code: 400, message: 'Please add rows in the database' });
	}

	const pages = res.value;
	return ok(
		pages.map((page) =>
			extractPropertiesFromPage<T>(page, client.config.extractor as PostPropertiesExtractor<T>)
		)
	);
};

export const getPostByCriteria = async <T>(
	alias: string,
	criteria: PageQueryCriteria
): Promise<StandardResult<{ blocks: BlockObjectResponse[]; properties: PostProperties<T> }>> => {
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

	return ok({
		blocks: blockResponse.value,
		properties: extractPropertiesFromPage<T>(
			page,
			client.config.extractor as PostPropertiesExtractor<T>
		)
	});
};

const extractPropertiesFromPage = <T>(
	page: PageObjectResponse,
	extractor: PostPropertiesExtractor<T>
): PostProperties<T> => {
	return extractor.extract(page);
};
