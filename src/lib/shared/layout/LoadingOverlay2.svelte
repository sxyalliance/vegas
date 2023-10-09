<script>
	import loading from '$lib/assets/loading.gif';
</script>

<svelte:head>
	<link rel="preload" as="image" href={loading} />
</svelte:head>

<section class="fixed bottom-0 left-0 right-0 top-0 z-50 h-screen overflow-hidden bg-neutral-2">
	<div class="flex h-full w-full items-center justify-center">
		<div class="flex items-center justify-center">
			<img loading="eager" src={loading} alt="loading animation" class="h-64 w-auto" />
		</div>
	</div>
</section>
