import { err, ok } from 'neverthrow';
import type { StandardResult } from '$lib/shared/shared/result';
import { createRequester } from '$lib/shared/shared/request';

export interface SpreadsheetRangeData {
	spreadsheetId: string;
	valueRanges: {
		range: string;
		majorDimension: string;
		values: string[][];
	}[];

	error?: {
		code: number;
		message: string;
		status: string;
	};
}

const requester = createRequester('https://content-sheets.googleapis.com');

export const getSpreadsheetRangeData = async (
	spreadsheetId: string,
	range: string
): Promise<StandardResult<SpreadsheetRangeData>> => {
	const url = `/v4/spreadsheets/${spreadsheetId}/values:batchGet`;
	const params = {
		ranges: range,
		key: 'AIzaSyDyXCQ5sFCJVeFi99ryVPHuOiFPycImS5s'
	};

	const data = await requester.get<SpreadsheetRangeData>(`${url}`, params);
	if (data.isErr()) {
		return err(data.error);
	}
	return ok(data.value);
};
