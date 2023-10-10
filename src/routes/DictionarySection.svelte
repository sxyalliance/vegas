<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Phrase } from '$lib/dictionary/phrase/phrase';
	import Button from '$lib/shared/shared/components/button/Button.svelte';
	import Card from '$lib/shared/shared/components/card/Card.svelte';
	import Badge from '$lib/shared/shared/components/badge/Badge.svelte';

	export let phrases: Phrase[];
</script>

<section class="bg-neutral-1 py-24">
	<div class="mx-auto max-w-4xl">
		<div class="mb-4 text-center text-xs text-low-contrast">
			<p>{$_('home.dictionary.note')}</p>
		</div>

		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			{#each phrases as spot (spot.phrase)}
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

		<div class="mx-auto px-4 py-6 text-center sm:px-6 lg:px-8 lg:py-8">
			<Button size="large" variant="soft" href="/dictionary">
				{$_('home.dictionary.view_more')}
			</Button>
		</div>
	</div>
</section>
