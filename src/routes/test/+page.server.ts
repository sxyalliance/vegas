import type { PageServerLoad } from './$types';
import { eventRepository } from '$lib/repositories/event';

export const load: PageServerLoad = async () => {
	const events = (await eventRepository.findAll()).map((event) => event.serialize());
	return {
		events
	};
};
