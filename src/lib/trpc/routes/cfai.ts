import { cfAi } from '$lib/server/cloudflare';
import { t } from '$lib/trpc/t';

export default {
	ask: t.procedure
		.input((prompt: unknown) => {
			if (typeof prompt === 'string') return prompt;

			throw new Error(`Invalid input: ${typeof prompt}`);
		})
		.mutation(async ({ input }) => {
			const result = await cfAi.ask(input);
			if (result.isErr()) throw result.error;
			return result.value;
		})
};
