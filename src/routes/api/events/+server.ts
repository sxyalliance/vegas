import type { RequestHandler } from './$types';
import { readItems } from '@directus/sdk';
import type { DirectusSchema } from "../../../../directus";

export const GET: RequestHandler = async ({ locals: { directus } }) => {
	const events = await directus.request(readItems('events'));

	return new Response(JSON.stringify(events));
};
