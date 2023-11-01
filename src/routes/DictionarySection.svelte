<script lang="ts">
	import { createQuery, useQueryClient } from '@tanstack/svelte-query';

	import { _ } from '$lib/shared/i18n';
	import DataUnavailableCallout from '$lib/shared/shared/components/DataUnavailableCallout.svelte';
	import Badge from '$lib/vgui/badge/Badge.svelte';
	import Button from '$lib/vgui/button/Button.svelte';
	import Card from '$lib/vgui/card/Card.svelte';
	import Section from '$lib/vgui/section/Section.svelte';

	import query from './query';

	const phrases = createQuery({
		queryKey: ['phrases', 'random'],
		queryFn: () => query()
	});

	const client = useQueryClient();
	const pickAnother = () => {
		client.invalidateQueries(['phrases', 'random']);
	};
</script>

<Section width="4xl" {...$$restProps}>
	<div class="mb-4 text-center text-xs text-low-contrast">
		<p>{_('home_dictionary_note')}</p>
	</div>

	{#if $phrases.isSuccess}
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			{#each $phrases.data as spot (spot.phrase)}
				<Card class="relative flex items-center space-x-3">
					<div class="min-w-0 flex-1">
						<span class="absolute inset-0" aria-hidden="true" />
						<Badge size="large" variant="soft" color="accent">
							{spot.phrase}
						</Badge>
						<p class="mt-1 text-sm text-low-contrast">
							{spot.definition}
						</p>
					</div>
				</Card>
			{/each}
		</div>
	{:else if $phrases.isError}
		<DataUnavailableCallout />
	{/if}

	<div class="mx-auto px-4 py-6 text-center sm:px-6 lg:px-8 lg:py-8">
		<Button size="large" variant="soft" href="/dictionary">
			{_('home_dictionary_view_more')}
		</Button>
		<Button size="large" variant="transparent" loading={$phrases.isFetching} on:click={pickAnother}>
			{_('home_dictionary_pick_another')}
		</Button>
	</div>
</Section>
