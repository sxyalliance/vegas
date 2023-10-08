import type { PageServerLoad } from './$types';
import { eventRepository } from '$lib/repositories/event';
import { serialize } from 'serializr';

export const load: PageServerLoad = async () => {
	const events = serialize(await eventRepository.findAll()) as string[];

	return {
		events
	};
};
