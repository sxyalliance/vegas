import { error } from '@sveltejs/kit';
import MaskData from 'maskdata';

import type { Category } from '$lib/event/category/entity';
import { categoryRepository } from '$lib/event/category/repository';
import { Event } from '$lib/event/event/entity';

import { memberRepository } from '$lib/member/member/repository';
import { getAllPosts, getPostByCriteria } from '$lib/server/notion';
import type { Client } from '$lib/server/notion/client';
import { constructClient } from '$lib/server/notion/client';
import type { PostPropertiesExtractor } from '$lib/server/notion/types';
import {
	makeNotNullable,
	mapPropertyToDate,
	mapPropertyToPrimitive
} from '$lib/server/notion/utils';
import type { Repository } from '$lib/shared/shared/repository';

const { maskPassword } = MaskData;

export interface EventRepository extends Repository<string, Event> {}

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
			await convertCategory(makeNotNullable(mapPropertyToPrimitive(page.properties['活動性質']))),
			parseInt(makeNotNullable(mapPropertyToPrimitive(page.properties['參與人數']))),
			makeNotNullable(mapPropertyToDate(page.properties['會合時間'])),
			maskAddress(makeNotNullable(mapPropertyToPrimitive(page.properties['會合地點']))),
			maskAddress(makeNotNullable(mapPropertyToPrimitive(page.properties['活動地點']))),
			mapPropertyToPrimitive(page.properties['去程載具']),
			mapPropertyToDate(page.properties['去程時間']),
			mapPropertyToPrimitive(page.properties['回程載具']),
			mapPropertyToDate(page.properties['回程時間']),
			await memberRepository.findByPk(
				makeNotNullable(mapPropertyToPrimitive(page.properties['發起人']))
			)
		);
	}
};

class NotionEventRepository implements EventRepository {
	private readonly client: Client;

	constructor() {
		this.client = constructClient({
			integrationSecret: 'secret_SSIPpymveUd3gSYyFQarQFzNVWNfoHq56cN9AfDyKXe',
			databaseId: '2342ff8d6c2b4654a29ed5994435fcd0',
			extractor
		});
	}

	async findAll(): Promise<Event[]> {
		const result = await getAllPosts<Event>(this.client);
		if (result.isErr()) {
			throw error(result.error.code, result.error.message);
		}
		return result.value;
	}

	async findByPk(pk: string): Promise<Event> {
		const result = await getPostByCriteria<Event>(this.client, {
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

const convertCategory = async (category: string): Promise<Category> => {
	let key;
	switch (category) {
		case '學術':
			key = 'academic';
			break;
		case '聚餐':
			key = 'dining';
			break;
		case '運動':
			key = 'sport';
			break;
		case '娛樂':
			key = 'entertainment';
			break;
		case '抽獎':
			key = 'giveaway';
			break;
		default:
			throw error(500, 'Unknown category');
	}
	return await categoryRepository.findByPk(key);
};

const maskAddress = (address: string): string => {
	const options = {
		maskWith: '*',
		unmaskedStartCharacters: 8,
		unmaskedEndCharacters: 0
	};
	return maskPassword(address, options);
};
