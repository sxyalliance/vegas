import { getGamingCalendar } from './calendar';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const gamingCalendar = await getGamingCalendar();
	return {
		gamingCalendar
	};
};
