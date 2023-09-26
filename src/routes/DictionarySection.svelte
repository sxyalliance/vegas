<script lang="ts">
	import dictionary from '$lib/api/dictionary.json';
	import { _ } from 'svelte-i18n';

	const spotted: { phrase: string; definition: string }[] = dictionary
		.sort(() => Math.random() - 0.5)
		.slice(0, 4);
</script>

<section class="py-24 bg-hue1">
	<div class="max-w-4xl mx-auto">
		<div class="text-center text-xs text-hue10 mb-4">
			<p>{$_('home.dictionary.note')}</p>
		</div>

		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			{#each spotted as spot (spot.phrase)}
				<div
					class="relative rounded-lg bg-hue2 px-6 py-5 shadow-sm flex items-center space-x-3 ring-0.3 ring-hue6"
				>
					<div class="flex-1 min-w-0">
						<span class="absolute inset-0" aria-hidden="true" />
						<p class="badge-flat-primary text-sm">
							{spot.phrase}
						</p>
						<p class="text-sm text-hue11 mt-1">
							{spot.definition}
						</p>
					</div>
				</div>
			{/each}
		</div>

		<div class="mx-auto text-center py-6 px-4 sm:px-6 lg:py-8 lg:px-8">
			<a href="/dictionary" class="btn-xl btn-soft">
				{$_('home.dictionary.view_more')}
			</a>
		</div>
	</div>
</section>
