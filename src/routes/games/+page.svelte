<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { createQuery, useQueryClient } from '@tanstack/svelte-query';

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

	const getStoreLink = (provider: string, provider_identifier: string) => {
		switch (provider) {
			case 'steam':
				return `https://store.steampowered.com/app/${provider_identifier}`;
			case 'epic':
				return `https://www.epicgames.com/store/en-US/p/${provider_identifier}`;
			case 'gog':
				return `https://www.gog.com/game/${provider_identifier}`;
			case 'origin':
				return `https://www.origin.com/irl/en-us/store/${provider_identifier}`;
			case 'uplay':
				return `https://store.ubi.com/${provider_identifier}`;
			case 'xbox':
				return `https://www.microsoft.com/en-us/p/${provider_identifier}`;
			case 'playstation':
				return `https://store.playstation.com/en-us/product/${provider_identifier}`;
			case 'nintendo':
				return `https://www.nintendo.com/games/detail/${provider_identifier}`;
			default:
				return '#';
		}
	};

	export let form;
	$: if (form) {
		useQueryClient().invalidateQueries(['games']);
	}
</script>

<SimpleHeroSection title="Gaming Votes" tagline="Vote your favours games to play">
	<Button slot="cta" href="/games/proposals">Make Proposal</Button>
</SimpleHeroSection>

<Section>
	<div role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#if $games.isSuccess}
			{#each $games.data as game}
				<Card.Root>
					<Card.Header class="pb-0">
						<div class="relative -m-6 mb-0">
							<img class="h-32 w-full rounded-md" src={game.image_url} alt="" />
							<span
								class="absolute right-0 top-0 flex items-center rounded-bl-lg rounded-tr-md bg-accent/70 px-3 py-1 text-lg text-accent-foreground"
							>
								{#if game.upvote_count > game.downvote_count}
									<Icon icon="lucide:plus" class="inline h-3 w-3" />
								{:else if game.upvote_count < game.downvote_count}
									<Icon icon="lucide:minus" class="mr-0.5 inline h-3 w-2.5" />
								{/if}
								{Math.abs(game.upvote_count - game.downvote_count)}
							</span>
						</div>
						<Card.Title class="pt-2">
							<div class="flex justify-between">
								<h3 class="text-lg font-medium">{game.name}</h3>
								<Badge
									variant="outline"
									class="capitalize"
									href={getStoreLink(game.provider, game.provider_identifier)}
									target="_blank"
								>
									{game.provider}#{game.provider_identifier}
								</Badge>
							</div>
						</Card.Title>
						<Card.Description class="line-clamp-5 h-25">{game.description}</Card.Description>
					</Card.Header>

					<form method="POST" use:enhance>
						<Card.Footer class="flex justify-between py-2">
							<input type="hidden" name="game_id" value={game.id} />

							<Button
								variant="link"
								class="-ml-2 px-6 text-primary hover:text-primary"
								type="submit"
								name="vote"
								value="upvote"
							>
								<Icon icon="tabler:thumb-up" class="mr-2 h-5 w-5" />
								Upvote
							</Button>
							<Separator orientation="vertical" decorative />
							<Button
								variant="link"
								class="-mr-2 px-6 text-destructive hover:text-destructive"
								type="submit"
								name="vote"
								value="downvote"
							>
								<Icon icon="tabler:thumb-down" class="mr-2 h-5 w-5" />
								Downvote
							</Button>
						</Card.Footer>
					</form>
				</Card.Root>
			{/each}
		{/if}
	</div>
</Section>
