import type { ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { eventRepository } from '$lib/repositories/event';
import { serialize } from 'serializr';

export const load: PageServerLoad = async (slEvent: ServerLoadEvent) => {
	const slug = slEvent.params.slug;
	if (!slug) {
		throw error(404, 'Not found');
	}

	const event = serialize(await eventRepository.findByPk(slug)) as string;
	return {
		event
	};
};
