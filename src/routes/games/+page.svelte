<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { createQuery } from '@tanstack/svelte-query';

	import SectionHeading from '$lib/shared/shared/components/SectionHeading.svelte';
	import SimpleHeroSection from '$lib/shared/shared/components/SimpleHeroSection.svelte';
	import { Badge } from '$lib/vgui/components/ui/badge';
	import { Button } from '$lib/vgui/components/ui/button';
	import * as Card from '$lib/vgui/components/ui/card';
	import { Separator } from '$lib/vgui/components/ui/separator';
	import Section from '$lib/vgui/section/Section.svelte';

	import query from './query';

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
				<Card.Root>
					<Card.Header class="pb-0">
						<div class="-m-6 mb-0">
							<img class="h-32 w-full rounded-md" src={game.image_url} alt="" />
						</div>
						<Card.Title class="pt-2">
							<div class="flex justify-between">
								<h3 class="text-lg font-medium">{game.name}</h3>
								<Badge variant="outline" class="capitalize">
									{game.provider}#{game.provider_identifier}
								</Badge>
							</div>
						</Card.Title>
						<Card.Description class="line-clamp-5">{game.description}</Card.Description>
					</Card.Header>

					<Card.Footer class="flex justify-between py-2">
						<Button variant="link" class="-ml-2 px-6 text-primary hover:text-primary">
							<Icon icon="tabler:thumb-up" class="mr-2 h-5 w-5" />
							Upvote
						</Button>
						<Separator orientation="vertical" decorative />
						<Button variant="link" class="-mr-2 px-6 text-destructive hover:text-destructive">
							<Icon icon="tabler:thumb-down" class="mr-2 h-5 w-5" />
							Downvote
						</Button>
					</Card.Footer>
				</Card.Root>
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
