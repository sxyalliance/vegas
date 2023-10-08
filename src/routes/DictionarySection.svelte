<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Phrase } from '$lib/dictionary/phrase/phrase';

	export let phrases: Phrase[];
</script>

<section class="bg-hue1 py-24">
	<div class="mx-auto max-w-4xl">
		<div class="mb-4 text-center text-xs text-hue10">
			<p>{$_('home.dictionary.note')}</p>
		</div>

		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			{#each phrases as spot (spot.phrase)}
				<div class="relative flex items-center bg-hue2 panel space-x-3">
					<div class="min-w-0 flex-1">
						<span class="absolute inset-0" aria-hidden="true" />
						<p class="badge-flat-primary text-sm">
							{spot.phrase}
						</p>
						<p class="mt-1 text-sm text-hue11">
							{spot.definition}
						</p>
					</div>
				</div>
			{/each}
		</div>

		<div class="mx-auto px-4 py-6 text-center lg:px-8 lg:py-8 sm:px-6">
			<a href="/dictionary" class="btn-xl btn-soft">
				{$_('home.dictionary.view_more')}
			</a>
		</div>
	</div>
</section>
