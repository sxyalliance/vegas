import { createRequester } from '$lib/shared/request';
import type { StandardResponse } from '$lib/shared/request/response';
import type { StandardResult } from '$lib/shared/shared/result';

export const cfAi = (customFetch: typeof window.fetch = fetch) => {
	const requester = createRequester('/api/ai', customFetch);
	return {
		ask: async (prompt: string): Promise<StandardResult<StandardResponse<string>>> => {
			return await requester.post<StandardResponse<string>>('/ask', { prompt });
		}
	};
};
