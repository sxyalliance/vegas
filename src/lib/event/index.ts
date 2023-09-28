import type { PostProperties, PostPropertiesExtractor } from '$lib/notion/types';
import { makeNotNullable, mapPropertyToDate, mapPropertyToPrimitive } from '$lib/notion/utils';
import { getAllPosts, getPostByCriteria } from '$lib/notion';
import { error } from '@sveltejs/kit';
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { registerClient } from '$lib/notion/config';

export type EventExtraProperties = {
	id: string;
	relatedPersonnel: number;
	meetingTime: Date;
	meetingPoint: string;
	eventPoint: string;
	outboundTransport: string | null;
	outboundTime: Date | null;
	inboundTransport: string | null;
	inboundTime: Date | null;
	proposer: string;
};

export const extractor: PostPropertiesExtractor<EventExtraProperties> = {
	extract: (page) => {
		return {
			title: makeNotNullable(mapPropertyToPrimitive(page.properties['活動名稱'])),
			slug: makeNotNullable(mapPropertyToPrimitive(page.properties['Slug'])),
			description: makeNotNullable(mapPropertyToPrimitive(page.properties['活動簡介'])),
			category: makeNotNullable(mapPropertyToPrimitive(page.properties['活動性質'])),

			extra: {
				id: makeNotNullable(mapPropertyToPrimitive(page.properties['活動編號'])),
				relatedPersonnel: parseInt(
					makeNotNullable(mapPropertyToPrimitive(page.properties['參與人數']))
				),
				meetingTime: makeNotNullable(mapPropertyToDate(page.properties['會合時間'])),
				meetingPoint: makeNotNullable(mapPropertyToPrimitive(page.properties['會合地點'])),
				eventPoint: makeNotNullable(mapPropertyToPrimitive(page.properties['活動地點'])),
				outboundTransport: mapPropertyToPrimitive(page.properties['去程載具']),
				outboundTime: mapPropertyToDate(page.properties['去程時間']),
				inboundTransport: mapPropertyToPrimitive(page.properties['回程載具']),
				inboundTime: mapPropertyToDate(page.properties['回程時間']),
				proposer: makeNotNullable(mapPropertyToPrimitive(page.properties['發起人']))
			}
		};
	}
};

registerClient('event', {
	integrationSecret: 'secret_SSIPpymveUd3gSYyFQarQFzNVWNfoHq56cN9AfDyKXe',
	databaseId: '2342ff8d6c2b4654a29ed5994435fcd0',
	extractor: extractor
});

export const getAllEvents = async (): Promise<PostProperties<EventExtraProperties>[]> => {
	const result = await getAllPosts<EventExtraProperties>('event');
	if (result.isErr()) {
		throw error(result.error.code, result.error.message);
	}
	return result.value;
};

export const getEventBySlug = async (
	slug: string
): Promise<{ blocks: BlockObjectResponse[]; properties: PostProperties<EventExtraProperties> }> => {
	const result = await getPostByCriteria<EventExtraProperties>('event', {
		filter: {
			property: 'Slug',
			rich_text: {
				equals: slug
			}
		}
	});

	if (result.isErr()) {
		throw error(result.error.code, result.error.message);
	}
	return result.value;
};
