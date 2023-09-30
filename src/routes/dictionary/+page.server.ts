import { getAllPhrases } from '$lib/dictionary';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const phrases = await getAllPhrases();
	return {
		phrases
	};
};
