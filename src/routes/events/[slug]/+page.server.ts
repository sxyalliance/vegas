import type { ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getEventBySlug } from '$lib/event';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async (slEvent: ServerLoadEvent) => {
	const slug = slEvent.params.slug;
	if (!slug) {
		throw error(404, 'Not found');
	}

	const event = await getEventBySlug(slug);
	return {
		event
	};
};
