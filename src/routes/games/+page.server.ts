import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const schema = z.object({
	name: z.string().default('John')
});

export const load = async () => {
	const form = await superValidate(schema);

	return { form };
};
