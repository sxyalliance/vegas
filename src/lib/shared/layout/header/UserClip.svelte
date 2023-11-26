<script lang="ts">
	import { page } from '$app/stores';

	import * as Avatar from '$lib/vgui/components/ui/avatar';
	import { Button } from '$lib/vgui/components/ui/button';

	import type { UserResponse } from '@supabase/supabase-js';

	let clazz = '';
	export { clazz as class };

	const getUserProfile = (userId: string) => {
		return $page.data.supabase.from('profiles').select('*').eq('id', userId).single();
	};

	const userFunc = $page.data.supabase.auth
		.getUser()
		.then((resp: UserResponse) => {
			if (resp.error) {
				throw resp.error;
			}
			return getUserProfile(resp.data.user.id);
		})
		.then((profile: ReturnType<typeof getUserProfile>) => {
			if (profile.error) {
				throw profile.error;
			}
			return profile.data;
		});

	$: loginLink = '/auth?redirect=' + encodeURIComponent($page.url.pathname);
</script>

{#await userFunc}
	<Button variant="outline" class={clazz} disabled>Loading...</Button>
{:then user}
	<Button variant="outline" class={clazz}>
		<Avatar.Root class="-ml-1 mr-2 h-6 w-6 rounded-full">
			<Avatar.Image src={user.avatar_url} alt={user.nickname} />
			<Avatar.Fallback>{user.nickname.slice(0, 1)}</Avatar.Fallback>
		</Avatar.Root>
		{user.nickname}
	</Button>
{:catch error}
	<Button variant="outline" class={clazz} href={loginLink}>Login</Button>
{/await}
