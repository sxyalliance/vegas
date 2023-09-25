import { Client } from '@notionhq/client';
import { getBlocks, getDatabaseById, getPageBySlug } from '$lib/notion/api';
import type { ServerLoadEvent } from '@sveltejs/kit';
import type {
	BlockObjectResponse,
	PageObjectResponse
} from '@notionhq/client/build/src/api-endpoints';
import type { PostProperties } from '$lib/notion/types';
import { error } from '@sveltejs/kit';

type ClientConfig = {
	integrationSecret: string;
	databaseId: string;
};

export type NotionClient = {
	client: Client;
	config: ClientConfig;
};

const clients: Record<string, NotionClient> = {};

export const initAndRegisterClient = (config: ClientConfig, alias: string): NotionClient => {
	const client = new Client({
		auth: config.integrationSecret
	});
	const clientObj: NotionClient = { client, config };
	clients[alias] = clientObj;
	return clientObj;
};

export const getClient = (alias: string): NotionClient => {
	if (clients[alias]) {
		return clients[alias];
	} else {
		throw new Error(`No client registered with alias ${alias}`);
	}
};

export const getAllPosts = async (alias: string): Promise<PostProperties[]> => {
	const notionClient = getClient(alias);

	const res = await getDatabaseById(notionClient);

	if (res.isOk()) {
		if (res.value?.length > 0) {
			const pages = res.value;
			return pages.map((page) => extractPropertiesFromPost(page));
		}

		throw error(400, 'Please add rows in the database');
	}

	if (res.isErr()) {
		throw error(res.error.code, res.error.message || 'Cannot reach Notion API');
	}

	throw error(500, 'Some error occurred');
};

export const getPostBySlug = async (
	alias: string,
	event: ServerLoadEvent
): Promise<{ blocks: BlockObjectResponse[]; slug: string; properties: PostProperties }> => {
	const notionClient = getClient(alias);
	const { slug } = event.params;

	if (!slug) {
		throw error(400, 'Invalid or missing post slug');
	}

	const response = await getPageBySlug(notionClient, slug);

	if (response.isOk() && response.value?.length > 0) {
		const page = response.value?.[0];
		if (!page?.id) {
			throw error(500, 'Invalid or missing page!');
		}

		const blockResponse = await getBlocks(notionClient, page.id);

		if (blockResponse.isOk()) {
			//console.log("result", JSON.stringify(blockResponse.value));
			const blocks: BlockObjectResponse[] = blockResponse.value;

			return {
				blocks,
				slug,
				properties: extractPropertiesFromPost(page)
			};
		}

		if (blockResponse.isErr()) {
			throw error(blockResponse.error.code, blockResponse.error.message);
		}
	}

	if (response.isErr()) {
		throw error(response.error.code, response.error.message);
	}

	throw error(500, 'Some error occurred');
};

const extractPropertiesFromPost = (post: PageObjectResponse): PostProperties => {
	const properties = post.properties;

	const slug = makeNotNullable(mapPropertyToPrimitive(properties['Slug']));
	const title = makeNotNullable(mapPropertyToPrimitive(properties['活動名稱']));
	const description = makeNotNullable(mapPropertyToPrimitive(properties['活動簡介']));
	const category = makeNotNullable(mapPropertyToPrimitive(properties['活動性質']));
	const relatedPersonnel = makeNotNullable(mapPropertyToPrimitive(properties['參與人數']));

	const meetingTime = makeNotNullable(mapPropertyToDate(properties['會合時間']));
	const meetingPoint = makeNotNullable(mapPropertyToPrimitive(properties['會合地點']));

	const eventPoint = makeNotNullable(mapPropertyToPrimitive(properties['活動地點']));

	const outboundTransport = mapPropertyToPrimitive(properties['去程載具']);
	const outboundTime = mapPropertyToDate(properties['去程時間']);

	const inboundTransport = mapPropertyToPrimitive(properties['回程載具']);
	const inboundTime = mapPropertyToDate(properties['回程時間']);

	const proposer = makeNotNullable(mapPropertyToPrimitive(properties['發起人']));

	return {
		title,
		slug,
		description,
		category,
		relatedPersonnel: parseInt(relatedPersonnel),
		meetingTime,
		meetingPoint,
		eventPoint,
		outboundTransport,
		outboundTime,
		inboundTransport,
		inboundTime,
		proposer
	};
};

const mapPropertyToPrimitive = (
	property: PageObjectResponse['properties'][string]
): string | null => {
	switch (property.type) {
		case 'title':
			return property.title.map((t) => t.plain_text).join('');
		case 'rich_text':
			return property.rich_text.map((t) => t.plain_text).join('');
		case 'select':
			return property.select?.name ?? null;
		case 'number':
			return property.number?.toString() ?? null;
		case 'relation':
			return property.relation?.map((r) => r.id).join(',') ?? null;
		default:
			throw new Error(`Unknown property type ${property.type}`);
	}
};

const mapPropertyToDate = (property: PageObjectResponse['properties'][string]): Date | null => {
	switch (property.type) {
		case 'date':
			return property.date ? new Date(property.date.start) : null;
		default:
			throw new Error(`Unknown property type ${property.type}`);
	}
};

const makeNotNullable = <T>(value: T | null): T => {
	if (value === null) {
		throw new Error('Value is null');
	}

	return value;
};
