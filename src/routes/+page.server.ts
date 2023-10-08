import type { PageServerLoad } from './$types';
import { serialize } from 'serializr';
import { phraseRepository } from '$lib/dictionary/phrase/repository';

export const load: PageServerLoad = async () => {
	const randomPhrases = serialize(
		(await phraseRepository.findAll()).sort(() => Math.random() - 0.5).slice(0, 4)
	);

	return {
		randomPhrases
	};
};
