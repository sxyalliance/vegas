<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';

	const getStatusByMessage = (message: string) => {
		switch (message) {
			case 'Not Found':
				return 404;
			default:
				return 500;
		}
	};

	const getDetailByMessage = (message: string) => {
		switch (message) {
			case 'Not Found':
				return 'The page you are looking for does not exist.';
			default:
				return 'An unknown error has occurred.';
		}
	};

	$: error = $page.error || {
		status: 500,
		message: 'Unrecognized Error'
	};

	$: statusCode = 'status' in error ? error.status : getStatusByMessage(error.message);
	$: message = error.message || 'Unknown Error';
	$: detail = getDetailByMessage(message);
</script>

<main class="bg-neutral-1 h-screen w-full">
	<div class="mx-auto flex max-w-7xl flex-auto flex-col justify-center px-6 py-24 sm:py-64 lg:px-8">
		<p class="text-accent-11 text-base font-semibold leading-8">
			{statusCode}
		</p>
		<h1 class="text-high-contrast mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
			{message}
		</h1>
		<p class="text-low-contrast mt-6 text-base leading-7">
			{detail}
		</p>
		<div class="mt-10">
			<a href="/" class="btn-xl btn-primary inline-flex">
				<Icon icon="tabler:arrow-back" class="icon-btn" />
				Back to Home
			</a>
		</div>
	</div>
</main>
