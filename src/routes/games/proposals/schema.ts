import { z } from 'zod';

export const formSchema = z.object({
	name: z.string(),
	provider: z.enum(['steam', 'xbox', 'other']),
	provider_identifier: z.string(),
	image_url: z.string().url(),
	on_sale: z.boolean().default(false).readonly().describe('Auto-populated by the API'),
	formatted_price: z.number().default(0).readonly().describe('Auto-populated by the API'),
	description: z.string()
});

export type FormSchema = typeof formSchema;
