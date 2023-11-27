<script lang="ts">
	import { page } from '$app/stores';
	import { createQuery } from '@tanstack/svelte-query';

	import SeoHandler from '$lib/shared/seo/SeoHandler.svelte';
	import DataUnavailableCallout from '$lib/shared/shared/components/DataUnavailableCallout.svelte';
	import SimpleHeroSection from '$lib/shared/shared/components/SimpleHeroSection.svelte';
	import { Card, CardHeader, CardTitle, CardDescription } from '$lib/vgui/components/ui/card';
	import { Input } from '$lib/vgui/components/ui/input';
	import Section from '$lib/vgui/section/Section.svelte';

	import query from './query';

	const phrases = createQuery({
		queryKey: ['phrases'],
		queryFn: () => query($page.data.supabase)
	});

	let search = '';

	const getFilteredPhrases = (search: string) => {
		if (!$phrases.isSuccess) return [];

		if (search.length > 0) {
			return $phrases.data.filter((phrase) =>
				phrase.phrase.toLowerCase().includes(search.toLowerCase())
			);
		}
		return $phrases.data;
	};
</script>

<SeoHandler
	metaTags={{
		title: 'Dictionary'
	}}
/>

<SimpleHeroSection title="Dictionary" tagline="Part of our memory palace">
	They are the building blocks of our language. Behind every phrase there is a story, a history, a
	culture. They have become the carriers of our history.
</SimpleHeroSection>

<Section>
	<Input bind:value={search} placeholder="Search for a phrase" class="mb-10" />

	{#if $phrases.isSuccess}
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
			{#each getFilteredPhrases(search) as spot (spot.phrase)}
				<Card>
					<CardHeader>
						<CardTitle>{spot.phrase}</CardTitle>
						<CardDescription>{spot.definition}</CardDescription>
					</CardHeader>
				</Card>
			{/each}
		</div>
	{:else if $phrases.isError}
		<DataUnavailableCallout />
	{/if}
</Section>
