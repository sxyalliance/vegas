import type { ErrorResult, StandardResult } from '$lib/shared/shared/result';

export type StandardResponse<T> = {
	error?: ErrorResult;

	data?: T;
};

export const responseFromResult = <T>(result: StandardResult<T>): StandardResponse<T> => {
	if (result.isErr()) {
		return { error: result.error };
	}

	return { data: result.value };
};

export const buildResponse = <T>(result: StandardResult<T>): Response => {
	const response = responseFromResult<T>(result);

	if (response.error) {
		return new Response(JSON.stringify(response.error), {
			status: response.error.code,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	return new Response(JSON.stringify(response.data), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
