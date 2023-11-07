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
	returnUrl = returnUrl || '/';
	if (!returnUrl.startsWith('/')) {
		returnUrl = '/' + returnUrl;
	}

	await authClient.signInWithOAuth({
		provider,
		options: {
			redirectTo: `http://localhost:5173/auth/callback?next=${encodeURIComponent(returnUrl)}`
		}
	});
};
