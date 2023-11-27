<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';

	import { AuthnSocialProvider, signIn } from '$lib/auth';
	import BrandLogo from '$lib/shared/layout/BrandLogo.svelte';
	import { Button } from '$lib/vgui/components/ui/button';
	import { Card, CardContent } from '$lib/vgui/components/ui/card';

	const socials = [
		{
			provider: AuthnSocialProvider.GitHub,
			icon: 'simple-icons:github',
			color: '#181717'
		},
		{
			provider: AuthnSocialProvider.Discord,
			icon: 'simple-icons:discord',
			color: '#5865F2'
		}
	];

	const handleSocialLogin = async (provider: AuthnSocialProvider) => {
		await signIn($page.data.supabase.auth, provider, $page.url.searchParams.get('redirect'));
	};
</script>

<div class="h-hero flex flex-col justify-center px-6 py-12 sm:py-20 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<BrandLogo class="mx-auto h-10 w-auto" />
		<h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight">
			Sign in to your account
		</h2>
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[360px]">
		<Card>
			<CardContent>
				<div class="flex justify-center font-medium">
					<span>Continue with</span>
				</div>

				<div class="mt-6 grid grid-cols-1 gap-4">
					{#each socials as social (social.provider)}
						<Button
							class="flex justify-center"
							on:click={() => handleSocialLogin(social.provider)}
							style={`background-color: ${social.color}`}
						>
							<Icon icon={social.icon} class="h-5 w-5" />
							<span class="ml-2 text-sm font-semibold capitalize">{social.provider}</span>
						</Button>
					{/each}
				</div>
			</CardContent>
		</Card>
	</div>
</div>
