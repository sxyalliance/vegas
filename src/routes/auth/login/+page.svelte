<script lang="ts">
	import { enhance } from '$app/forms';

	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<main>
	<form method="POST" use:enhance>
		<h1>{`Sign ${data.mode === 'signin' ? 'In' : 'Up'}`}</h1>

		<h2>
			{#if data.mode === 'signin'}
				Not registered yet? <a href={`/auth/login?mode=signup`}>Sign Up</a>
			{:else}
				Already have an account? <a href={'/auth/login'}>Sign In</a>
			{/if}
		</h2>

		<hr />

		{#if form?.errors.banner}
			<div role="alert">{form.errors.banner}</div>
		{/if}

		<label for="email">Email</label>
		<input
			id="email"
			name="email"
			placeholder="Email Address"
			type="email"
			aria-invalid={!!form?.errors.email}
			aria-errormessage="email-error"
		/>
		{#if !!form?.errors.email}
			<div id="email-error" role="alert">{form.errors.email}</div>
		{/if}

		<label for="password">Password</label>
		<input
			id="password"
			name="password"
			placeholder="Password"
			type="password"
			aria-invalid={!!form?.errors.password}
			aria-errormessage="password-error"
		/>
		{#if !!form?.errors.password}
			<div id="password-error" role="alert">{form.errors.password}</div>
		{/if}

		<input name="mode" type="hidden" value={data.mode} />
		<button type="submit">{`Sign ${data.mode === 'signin' ? 'In' : 'Up'}`}</button>

		{#if data.mode === 'signin'}
			<a class="forgot-password" href={'/auth/reset'}>Forgot password?</a>
		{/if}
	</form>
</main>
