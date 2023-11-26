import { redirect } from 'sveltekit-flash-message/server';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	const {
		url,
		locals: { supabase }
	} = event;
	const code = url.searchParams.get('code') as string;
	const next = url.searchParams.get('next') ?? '/';

	if (!code) {
		throw redirect('/auth', { type: 'error', message: 'No auth code provided.' }, event);
	}

	const { error } = await supabase.auth.exchangeCodeForSession(code);
	if (error) {
		throw redirect('/auth', { type: 'error', message: 'Failed to validate auth code.' }, event);
	}

	throw redirect(
		`/${next.slice(1)}`,
		{ type: 'success', message: 'You are now logged in!' },
		event
	);
};
