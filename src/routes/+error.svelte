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

	$: statusCode = error.status || getStatusByMessage(error.message);
	$: message = error.message || 'Unknown Error';
	$: detail = getDetailByMessage(message);
</script>

<main class="h-screen w-full bg-hue2">
	<div class="mx-auto max-w-7xl flex flex-auto flex-col justify-center px-6 py-24 lg:px-8 sm:py-64">
		<p class="text-base font-semibold leading-8 text-primary10">
			{statusCode}
		</p>
		<h1 class="mt-4 text-3xl font-bold tracking-tight text-hue12 sm:text-5xl">
			{message}
		</h1>
		<p class="mt-6 text-base leading-7 text-hue11">
			{detail}
		</p>
		<div class="mt-10">
			<a href="/" class="btn-xl inline-flex btn-primary">
				<Icon icon="tabler:arrow-back" class="btn-icon" />
				Back to Home
			</a>
		</div>
	</div>
</main>
