import type { PageServerLoad } from './$types';
import { getAllMembers } from '$lib/member';

export const load: PageServerLoad = async () => {
	const members = await getAllMembers();
	return {
		members
	};
};
