import type { PageServerLoad } from './$types';
import { getAllPosts } from '$lib/notion';

export const load: PageServerLoad = async () => {
	const events = await getAllPosts('events');
	return {
		events
	};
};
