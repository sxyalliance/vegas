import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { ServerLoadEvent } from '@sveltejs/kit';
import { getMemberByName } from '$lib/member';

export const load: PageServerLoad = async (slEvent: ServerLoadEvent) => {
	const name = slEvent.params.name;
	if (!name) {
		throw error(404, 'Not found');
	}

	const member = await getMemberByName(name);
	return {
		member
	};
};
