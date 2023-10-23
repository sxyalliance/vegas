import { createRequester } from '$lib/shared/request';
import { err } from 'neverthrow';
import type { StandardResponse } from '$lib/shared/request/response';

export const cfAi = (customFetch: typeof window.fetch) => {
	const requester = createRequester('/api/ai', customFetch);
	return {
		ask: async (prompt: string) => {
			const resp = await requester.post<StandardResponse<string>>('/ask', { prompt });
			return resp.unwrapOr(err({ code: 500, message: 'Cloudflare AI failed to respond' }));
		}
	};
};
