import type { Repository } from '$lib/repositories/repository.interface';
import { Event } from '$lib/entities/event';
import { CategoryKey } from '$lib/event';
import { error } from '@sveltejs/kit';

import MaskData from 'maskdata';
import type { PostPropertiesExtractor } from '$lib/server/notion/types';
import {
	makeNotNullable,
	mapPropertyToDate,
	mapPropertyToPrimitive
} from '$lib/server/notion/utils';
import { registerClient } from '$lib/server/notion/config';
import { getAllPosts, getPostByCriteria } from '$lib/server/notion';

const { maskPassword } = MaskData;

export interface EventRepository extends Repository<string, Event> {}

class NotionEventRepository implements EventRepository {
	async findAll(): Promise<Event[]> {
		const result = await getAllPosts<Event>('event');
		if (result.isErr()) {
			throw error(result.error.code, result.error.message);
		}
		return result.value;
	}

	async findByPk(pk: string): Promise<Event> {
		const result = await getPostByCriteria<Event>('event', {
			filter: {
				property: 'Slug',
				rich_text: {
					equals: pk
				}
			}
		});

		if (result.isErr()) {
			throw error(result.error.code, result.error.message);
		}
		const event = result.value.properties;
		event.blocks = result.value.blocks;
		return event;
	}
}

export const eventRepository: EventRepository = new NotionEventRepository();

const convertCategory = (category: string): CategoryKey => {
	switch (category) {
		case '學術':
			return CategoryKey.ACADEMIC;
		case '聚餐':
			return CategoryKey.DINING;
		case '運動':
			return CategoryKey.SPORT;
		case '娛樂':
			return CategoryKey.ENTERTAINMENT;
		case '抽獎':
			return CategoryKey.GIVEAWAY;
		default:
			throw error(500, 'Unknown category');
	}
};

const maskAddress = (address: string): string => {
	const options = {
		maskWith: '*',
		unmaskedStartCharacters: 8,
		unmaskedEndCharacters: 0
	};
	return maskPassword(address, options);
};

const extractor: PostPropertiesExtractor<Event> = {
	extract: async (page) => {
		const slug = mapPropertyToPrimitive(page.properties['Slug']);
		if (!slug) {
			return null;
		}

		return new Event(
			makeNotNullable(mapPropertyToPrimitive(page.properties['活動編號'])),
			makeNotNullable(mapPropertyToPrimitive(page.properties['活動名稱'])),
			makeNotNullable(slug),
			makeNotNullable(mapPropertyToPrimitive(page.properties['活動簡介'])),
			convertCategory(makeNotNullable(mapPropertyToPrimitive(page.properties['活動性質']))),
			parseInt(makeNotNullable(mapPropertyToPrimitive(page.properties['參與人數']))),
			makeNotNullable(mapPropertyToDate(page.properties['會合時間'])),
			maskAddress(makeNotNullable(mapPropertyToPrimitive(page.properties['會合地點']))),
			maskAddress(makeNotNullable(mapPropertyToPrimitive(page.properties['活動地點']))),
			mapPropertyToPrimitive(page.properties['去程載具']),
			mapPropertyToDate(page.properties['去程時間']),
			mapPropertyToPrimitive(page.properties['回程載具']),
			mapPropertyToDate(page.properties['回程時間']),
			makeNotNullable(mapPropertyToPrimitive(page.properties['發起人']))
		);
	}
};

registerClient('event', {
	integrationSecret: 'secret_SSIPpymveUd3gSYyFQarQFzNVWNfoHq56cN9AfDyKXe',
	databaseId: '2342ff8d6c2b4654a29ed5994435fcd0',
	extractor
});
