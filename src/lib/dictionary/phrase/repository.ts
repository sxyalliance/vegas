import { error } from '@sveltejs/kit';

import type { Phrase } from '$lib/dictionary/phrase/phrase';
import { getAllPosts, getPostByCriteria } from '$lib/server/notion';
import type { Client } from '$lib/server/notion/client';
import { constructClient } from '$lib/server/notion/client';
import type { PostPropertiesExtractor } from '$lib/server/notion/types';
import { makeNotNullable, mapPropertyToPrimitive } from '$lib/server/notion/utils';

import type { Repository } from '$lib/shared/shared/repository';

export interface PhraseRepository extends Repository<string, Phrase> {}

const extractor: PostPropertiesExtractor<Phrase> = {
	extract: async (page) => {
		return {
			phrase: makeNotNullable(mapPropertyToPrimitive(page.properties['詞匯'])),
			definition: makeNotNullable(mapPropertyToPrimitive(page.properties['釋義']))
		};
	}
};

class NotionPhraseRepository implements PhraseRepository {
	private readonly client: Client;

	constructor() {
		this.client = constructClient({
			integrationSecret: 'secret_SSIPpymveUd3gSYyFQarQFzNVWNfoHq56cN9AfDyKXe',
			databaseId: 'e2150cab62074538bd5d40949dacb5da',
			extractor
		});
	}

	async findAll(): Promise<Phrase[]> {
		const result = await getAllPosts<Phrase>(this.client);
		if (result.isErr()) {
			throw error(result.error.code, result.error.message);
		}
		return result.value;
	}

	async findByPk(pk: string): Promise<Phrase> {
		const result = await getPostByCriteria<Phrase>(this.client, {
			filter: {
				property: '詞匯',
				title: {
					equals: pk
				}
			}
		});

		if (result.isErr()) {
			throw error(result.error.code, result.error.message);
		}
		return result.value.properties;
	}
}

export const phraseRepository: PhraseRepository = new NotionPhraseRepository();
