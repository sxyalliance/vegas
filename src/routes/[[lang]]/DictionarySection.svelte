<script lang="ts">
	import { page } from '$app/stores';
	import { createQuery, useQueryClient } from '@tanstack/svelte-query';

	import { Loader2 } from 'lucide-svelte';

	import * as m from '$i18n/messages';
	import DataUnavailableCallout from '$lib/shared/shared/components/DataUnavailableCallout.svelte';
	import { Button } from '$lib/vgui/components/ui/button';
	import * as Card from '$lib/vgui/components/ui/card';
	import Section from '$lib/vgui/section/Section.svelte';

	import query from './query';

	const phrases = createQuery({
		queryKey: ['phrases', 'random'],
		queryFn: () => query($page.data.supabase)
	});

	const client = useQueryClient();
	const pickAnother = () => {
		client.invalidateQueries(['phrases', 'random']);
	};
</script>

<Section width="4xl" {...$$restProps}>
	<div class="mb-4 text-center text-xs text-muted-foreground">
		<p>{m.home_dictionary_note()}</p>
	</div>

	{#if $phrases.isSuccess}
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			{#each $phrases.data as spot (spot.phrase)}
				<Card.Root>
					<Card.Header>
						<Card.Title>{spot.phrase}</Card.Title>
						<Card.Description>{spot.definition}</Card.Description>
					</Card.Header>
				</Card.Root>
			{/each}
		</div>
	{:else if $phrases.isError}
		<DataUnavailableCallout />
	{/if}

	<div class="mx-auto px-4 py-6 text-center sm:px-6 lg:px-8 lg:py-8">
		<Button href="/dictionary">
			{m.home_dictionary_view_more()}
		</Button>
		<Button class="ml-2" variant="secondary" disabled={$phrases.isFetching} on:click={pickAnother}>
			{#if $phrases.isFetching}
				<Loader2 class="mr-2 h-4 w-4 animate-spin" />
			{/if}
			{m.home_dictionary_pick_another()}
		</Button>
	</div>
</Section>
