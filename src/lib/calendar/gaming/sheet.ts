import { err, ok } from 'neverthrow';
import type { StandardResult } from '$lib/shared/types/error';

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

export const getSpreadsheetRangeData = async (
	spreadsheetId: string,
	range: string
): Promise<StandardResult<SpreadsheetRangeData>> => {
	const baseApi = 'https://content-sheets.googleapis.com';
	const url = `${baseApi}/v4/spreadsheets/${spreadsheetId}/values:batchGet`;
	const params = {
		ranges: range,
		key: 'AIzaSyDyXCQ5sFCJVeFi99ryVPHuOiFPycImS5s'
	};
	const queryString = new URLSearchParams(params).toString();
	const request = new Request(`${url}?${queryString}`, {
		method: 'GET',
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	});
	const response = await fetch(request);
	if (response.ok) {
		const data = await response.json();
		if (data.error) {
			return err({ code: data.error.code, message: data.error.message });
		}
		return ok(data as SpreadsheetRangeData);
	}
	return err({ code: response.status, message: response.statusText });
};
