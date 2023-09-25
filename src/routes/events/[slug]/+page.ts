import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	try {
		const event = await import(`../../../lib/content/events/${params.slug}.md`);

		return {
			content: event.default,
			meta: event.metadata
		};
	} catch (e) {
		throw error(404, `Event ${params.slug} not found`);
	}
};
