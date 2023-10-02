import { err, ok } from 'neverthrow';
import type { StandardResult } from '$lib/shared/types/error';

interface SpreadsheetRangeData {
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

interface ParsedData {
	// username
	[key: string]: {
		// day of week
		[key: string]: {
			// time of day
			[key: string]: string;
		};
	};
}

export const parseIt = (data: SpreadsheetRangeData) => {
	const values = data.valueRanges[0].values;
	const keys = values[0];
	// append three empty strings to keys, since gapi response do not include the trailing empty cells
	keys.push('', '', '');

	// build keys map, if empty string, use previous non-empty key
	const keysMap: Record<number, string> = {};
	keys.forEach((key, index) => {
		if (key) {
			keysMap[index] = key;
		} else {
			keysMap[index] = keysMap[index - 1];
		}
	});

	const subKeys = values[2];

	const getKey = (index: number) => {
		return keysMap[index];
	};

	const parsed: ParsedData = {};

	values.slice(3).map((row) => {
		let username = '';
		const obj: Record<string, Record<string, string>> = {};

		row.forEach((value, index) => {
			const key = getKey(index);
			const subKey = subKeys[index];

			if (key === 'You name here' && value) {
				username = value;
				return;
			}

			obj[key] = obj[key] || {};
			obj[key][subKey] = value;
		});

		parsed[username] = obj;
	});

	return parsed;
};
