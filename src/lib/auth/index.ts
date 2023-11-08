import { browser } from '$app/environment';
import { page } from '$app/stores';
import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';

import type { GoTrueClient } from '@supabase/supabase-js';

export enum AuthnSocialProvider {
	GitHub = 'github',
	Discord = 'discord'
}

export const signIn = async (
	authClient: GoTrueClient,
	provider: AuthnSocialProvider,
	returnUrl: string | null = null
) => {
	if (!browser) {
		throw error(401, 'Sign in request should not initiate on server side.');
	}

	const origin = get(page).url.origin;

	returnUrl = returnUrl || '/';
	if (!returnUrl.startsWith('/')) {
		returnUrl = '/' + returnUrl;
	}

	await authClient.signInWithOAuth({
		provider,
		options: {
			redirectTo: `${origin}/auth/callback?next=${returnUrl}`
		}
	});
};
