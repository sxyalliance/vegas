import type { Client } from '../client';
import { Err, err, ok, Result } from 'neverthrow';
import type {
	PageObjectResponse,
	QueryDatabaseParameters
} from '@notionhq/client/build/src/api-endpoints';
import {
	APIErrorCode,
	ClientErrorCode,
	isFullBlock,
	isFullPage,
	isNotionClientError
} from '@notionhq/client';
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { ErrorResult } from '$lib/shared/shared/result';

export type PageQueryCriteria = Pick<
	QueryDatabaseParameters,
	'filter' | 'sorts' | 'start_cursor' | 'page_size'
>;

export const getDatabaseById = async (
	client: Client
): Promise<Result<PageObjectResponse[], ErrorResult>> => {
	try {
		const notion = client.sdk;

		if (!notion) {
			return err({ code: 400, message: 'Invalid or missing notion secret' });
		}

		const database = await notion.databases.query({
			database_id: client.config.databaseId
		});

		const results = database.results;

		if (isPageObjectResponse(results) && results?.length > 0) {
			return ok(results);
		} else {
			return ok([]);
		}
	} catch (error) {
		return handleNotionError(error);
	}
};

export const getPageByCriteria = async (
	client: Client,
	criteria: PageQueryCriteria
): Promise<Result<PageObjectResponse[], ErrorResult>> => {
	try {
		const notion = client.sdk;

		if (!notion) {
			return err({ code: 400, message: 'Invalid or missing notion secret' });
		}

		const res = await notion.databases.query({
			database_id: client.config.databaseId,
			...criteria
		});

		const pages: PageObjectResponse[] = [];

		if (res) {
			for (const page of res.results) {
				if (!isFullPage(page)) {
					continue;
				}

				pages.push(page);
			}

			return ok(pages);
		} else {
			return err({ code: 500, message: 'Some error occurred' });
		}
	} catch (error) {
		return handleNotionError(error);
	}
};

export const getPageById = async (
	client: Client,
	pageId: string
): Promise<Result<PageObjectResponse, ErrorResult>> => {
	try {
		const notion = client.sdk;

		if (!notion) {
			return err({ code: 400, message: 'Invalid or missing notion secret' });
		}

		const page = await notion.pages.retrieve({ page_id: pageId });

		if (isFullPage(page)) {
			return ok(page);
		} else {
			return err({ code: 500, message: 'Some error occurred' });
		}
	} catch (error) {
		return handleNotionError(error);
	}
};

export const getBlocks = async (
	client: Client,
	blockId: string
): Promise<Result<BlockObjectResponse[], ErrorResult>> => {
	const notion = client.sdk;

	if (!notion) {
		return err({ code: 400, message: 'Invalid or missing notion secret' });
	}

	const { results } = await notion.blocks.children.list({
		block_id: blockId,
		page_size: 100
	});

	const blocks: BlockObjectResponse[] = [];

	if (results && results.length > 0) {
		for (const block of results) {
			if (!isFullBlock(block)) continue;
			blocks.push(block);
		}

		return ok(blocks);
	} else if (results && results.length == 0) {
		return ok([]);
	} else {
		return err({ code: 500, message: 'Unknown Error' });
	}
};

const handleNotionError = (error: unknown): Err<never, ErrorResult> => {
	if (isNotionClientError(error)) {
		// error is now strongly typed to NotionClientError
		switch (error.code) {
			case ClientErrorCode.RequestTimeout:
				return err({ code: 400, message: 'Request could not be completed' });
			case APIErrorCode.ObjectNotFound:
				return err({ code: 500, message: 'Database of page not found' });
			case APIErrorCode.Unauthorized:
				return err({ code: 401, message: 'User not authorized' });
			default:
				return err({ code: 500, message: 'Some error occurred' });
		}
	} else {
		return err({
			code: 400,
			message: error ? (Object.keys(error)?.length > 0 ? '' : '') : 'Some error occurred'
		});
	}
};

function isPageObjectResponse(response: unknown): response is PageObjectResponse[] {
	return (
		(response as PageObjectResponse[])?.[0]?.properties !== null &&
		(response as PageObjectResponse[])?.[0]?.properties !== undefined
	);
}
