import type {Event} from "$lib/types/event";
import { getEvents } from "$lib/data/event";

export async function load(): Promise<{events: Event[]}> {
	const events = await getEvents();
	return {
		events,
	}
}
