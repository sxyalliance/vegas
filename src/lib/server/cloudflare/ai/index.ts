import { createRequester } from '$lib/shared/request';
import type { StandardResult } from '$lib/shared/shared/result';
import { err, ok } from 'neverthrow';
import type { CloudflareApiResponse, CloudflareAiResult } from '$lib/shared/cloudflare/types';

const acc = '58055b1d371c096daff3498f0f455e9d';
const tkn = 'NBVwvnsWSP3Ano8R12d80F3LPx3EBAQOUmXjxSNY';

const api = `https://api.cloudflare.com/client/v4/accounts/${acc}/ai/run`;

const requester = createRequester(api, fetch, tkn);

export const ask = async (prompt: string): Promise<StandardResult<string>> => {
	const resp = await requester.post<CloudflareApiResponse<CloudflareAiResult>>(
		`/@cf/meta/llama-2-7b-chat-int8`,
		{ prompt }
	);

	if (resp.isErr()) {
		return err(resp.error);
	}

	if (!resp.value.success || !resp.value.result.response) {
		return err({ code: 500, message: 'Cloudflare AI failed to respond' });
	}

	return ok(resp.value.result.response);
};
