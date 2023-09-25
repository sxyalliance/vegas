import type { ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getPostBySlug } from '$lib/notion';

export const load: PageServerLoad = async (slEvent: ServerLoadEvent) => {
	const event = await getPostBySlug('events', slEvent);
	return {
		event
	};
};
