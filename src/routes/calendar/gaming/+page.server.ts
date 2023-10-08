import type { PageServerLoad } from './$types';
import { getGamingCalendar } from './calendar';

export const load: PageServerLoad = async () => {
	const gamingCalendar = await getGamingCalendar();
	return {
		gamingCalendar
	};
};
