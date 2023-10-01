import type { PageServerLoad } from './$types';
import { getSpreadsheetRangeData } from '$lib/google/sheet';
import { error } from '@sveltejs/kit';

const spreadsheetId = '1XL4WQfdRTIBIGRJ2051Lt02cRSF99gIVTRwMX35Ym2c';
const range = 'A11:AC18';

export const load: PageServerLoad = async () => {
	const result = await getSpreadsheetRangeData(spreadsheetId, range);
	if (result.isErr()) {
		throw error(result.error.code, result.error.message);
	}
	const unparsed = result.value;
	return {
		unparsed
	};
};
