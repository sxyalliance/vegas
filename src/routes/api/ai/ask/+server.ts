import type { RequestHandler } from './$types';
import { cfAi } from '$lib/server/cloudflare';
import { buildResponse } from '$lib/shared/request/response';

export const POST: RequestHandler = async ({ request }) => {
	const prompt = (await request.json()).prompt;
	if (!prompt) {
		return new Response('Missing prompt', { status: 400 });
	}
	const resp = await cfAi.ask(prompt as string);
	return buildResponse(resp);
};
