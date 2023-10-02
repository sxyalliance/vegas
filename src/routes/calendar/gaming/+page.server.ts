import type { PageServerLoad } from './$types';
import { getGamingCalendar } from '$lib/calendar/gaming';

export const load: PageServerLoad = async () => {
	const gamingCalendar = await getGamingCalendar();
	return {
		gamingCalendar
	};
};
