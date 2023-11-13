<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { superForm } from 'sveltekit-superforms/client';

	import SectionHeading from '$lib/shared/shared/components/SectionHeading.svelte';
	import SimpleHeroSection from '$lib/shared/shared/components/SimpleHeroSection.svelte';
	import Badge from '$lib/vgui/badge/Badge.svelte';
	import Card from '$lib/vgui/card/Card.svelte';
	import Section from '$lib/vgui/section/Section.svelte';

	import query from './query';

	import type { PageData } from './$types';

	export let data: PageData;

	const { form } = superForm(data.form);

	const games = createQuery({
		queryKey: ['games'],
		queryFn: () => query($page.data.supabase)
	});

	$: console.log($games);
</script>

<SimpleHeroSection title="Gaming Votes" tagline="Vote your favours games to play" />

<Section>
	<div role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#if $games.isSuccess}
			{#each $games.data as game}
				<Card variant="classic" class="col-span-1 flex flex-col divide-y divide-neutralA-6">
					<div class="flex flex-1 flex-col">
						<div class="-m-6 mb-0 flex-shrink-0">
							<img class="h-32 w-full rounded-md" src={game.image_url} alt="" />
						</div>
						<div class="mt-4 flex justify-between">
							<h3 class="text-lg font-medium text-high-contrast">{game.name}</h3>
							<Badge variant="soft" class="capitalize">
								{game.provider}#{game.provider_identifier}
							</Badge>
						</div>
						<p class="mt-2 line-clamp-5 text-sm text-low-contrast">{game.description}</p>
					</div>

					<div class="-m-6 mt-4">
						<div class="-mt-px flex divide-x divide-neutralA-6">
							<div class="-mr-px flex flex-1">
								<button
									class="relative inline-flex flex-1 items-center justify-center gap-x-1 py-3 text-sm font-semibold text-success-10"
								>
									<Icon icon="tabler:thumb-up" class="h-5 w-5" />
									Upvote
								</button>
							</div>
							<div class="-ml-px flex flex-1">
								<button
									class="relative inline-flex flex-1 items-center justify-center gap-x-1 py-3 text-sm font-semibold text-danger-10"
								>
									<Icon icon="tabler:thumb-down" class="h-5 w-5" />
									Downvote
								</button>
							</div>
						</div>
					</div>
				</Card>
			{/each}
		{/if}
	</div>
</Section>

<Section alternate>
	<SectionHeading title="Propose a game">
		We do not support proposing games from the website yet, but you can submit the proposal to the
		Press Department on Discord directly.
		<br /><br /> This feature will be available soon.
	</SectionHeading>
</Section>
