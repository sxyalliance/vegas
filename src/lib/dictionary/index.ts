import type { PostPropertiesExtractor } from '$lib/server/notion/types';
import { makeNotNullable, mapPropertyToPrimitive } from '$lib/server/notion/utils';
import { registerClient } from '$lib/server/notion/config';
import { getAllPosts } from '../server/notion';
import { error } from '@sveltejs/kit';

export type PhraseProperties = {
	phrase: string;
	definition: string;
};

export const extractor: PostPropertiesExtractor<PhraseProperties> = {
	extract: (page) => {
		return {
			phrase: makeNotNullable(mapPropertyToPrimitive(page.properties['詞匯'])),
			definition: makeNotNullable(mapPropertyToPrimitive(page.properties['釋義']))
		};
	}
};

export const getAllPhrases = async (): Promise<PhraseProperties[]> => {
	const result = await getAllPosts<PhraseProperties>('dictionary');
	if (result.isErr()) {
		throw error(result.error.code, result.error.message);
	}
	return result.value;
};

registerClient('dictionary', {
	integrationSecret: 'secret_SSIPpymveUd3gSYyFQarQFzNVWNfoHq56cN9AfDyKXe',
	databaseId: 'e2150cab62074538bd5d40949dacb5da',
	extractor: extractor
});
