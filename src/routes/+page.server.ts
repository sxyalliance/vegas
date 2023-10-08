import type { PageServerLoad } from './$types';
import { serialize } from 'serializr';
import { phraseRepository } from '$lib/dictionary/phrase/repository';
import { Phrase } from '$lib/dictionary/phrase/phrase';

export const load: PageServerLoad = async () => {
	const randomPhrases = serialize(
		Phrase,
		(await phraseRepository.findAll()).sort(() => Math.random() - 0.5).slice(0, 4)
	);

	return {
		randomPhrases
	};
};
