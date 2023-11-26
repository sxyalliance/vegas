import { z } from 'zod';

export const formSchema = z.object({
	name: z.string().min(2).max(30),
	email: z.string().email(),
	message: z.string().min(10).max(500)
});

export type FormSchema = typeof formSchema;
