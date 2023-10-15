<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { constructDirectus } from '$lib/shared/directus/client';
	import { readItems } from '@directus/sdk';

	const events = createQuery({
		queryKey: ['events'],
		queryFn: () => constructDirectus().request(readItems('events'))
	});
</script>

<div>
	<div>
		{#if $events.status === 'loading'}
			<span>Loading...</span>
		{:else if $events.status === 'error'}
			<span>Error: {$events.error.message}</span>
		{:else}
			<ul>
				{#each $events.data as event}
					<article>
						<a href={`/${event.id}`}>
							{event.name}
						</a>
					</article>
				{/each}
			</ul>
			{#if $events.isFetching}
				<div style="color:darkgreen; font-weight:700">Background Updating...</div>
			{/if}
		{/if}
	</div>
</div>
