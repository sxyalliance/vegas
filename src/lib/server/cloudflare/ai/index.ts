import { CLOUDFLARE_ACCOUNT, CLOUDFLARE_AI_TOKEN_VALUE } from '$env/static/private';
import { err, ok } from 'neverthrow';

import { createRequester } from '$lib/shared/request';

import type { StandardResult } from '$lib/shared/shared/result';

const acc = CLOUDFLARE_ACCOUNT;
const tkn = CLOUDFLARE_AI_TOKEN_VALUE;

const api = `https://api.cloudflare.com/client/v4/accounts/${acc}/ai/run`;

interface AskResponse {
	result: {
		response: string;
	};
	success: boolean;
	errors: { message: string; code: number }[];
	messages: string[];
}

const requester = createRequester(api, fetch, tkn, (e: unknown) => {
	const firstError = (e as { json: AskResponse }).json.errors?.[0];
	if (firstError) {
		return { code: firstError.code, message: firstError.message };
	}
	return false;
});

export const ask = async (prompt: string): Promise<StandardResult<string>> => {
	const resp = await requester.post<AskResponse>(`/@cf/meta/llama-2-7b-chat-int8`, { prompt });

	if (resp.isErr()) {
		return err(resp.error);
	}

	if (!resp.value.success || !resp.value.result.response) {
		return err({ code: 500, message: 'Cloudflare AI failed to respond' });
	}

	return ok(resp.value.result.response);
};
