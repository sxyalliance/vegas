<script>
	import { page } from '$app/stores';

	const login = async () => {
		await $page.data.supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: `http://localhost:5173/auth/callback?next=/auth`
			}
		});
	};

	const session = $page.data.session;
</script>

<div class="mt-20" />

<button on:click={login}>Login</button>

{#await session}
	<p>Checking session...</p>
{:then session}
	<p>Session: {JSON.stringify(session)}</p>
{:catch error}
	<p>Error: {error.message}</p>
{/await}
```
