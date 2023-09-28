import type { PageServerLoad } from './$types';
import { getAllEvents } from '$lib/event';

export const load: PageServerLoad = async () => {
	const events = await getAllEvents();
	return {
		events
	};
};
