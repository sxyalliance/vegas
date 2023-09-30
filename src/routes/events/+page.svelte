<script lang="ts">
	import HeroSection from './HeroSection.svelte';
	import { title } from '$lib/layout/title';
	import type { PageData } from './$types';
	import { _ } from 'svelte-i18n';

	export let data: PageData;

	title.set('Events');
</script>

<HeroSection />

<section class="bg-hue1 px-4 py-12 lg:px-8 lg:py-24 sm:px-6">
	<div class="mx-auto max-w-7xl text-center">
		<div
			class="grid grid-cols-1 mx-auto max-w-2xl gap-x-8 gap-y-16 lg:grid-cols-3 lg:mx-0 lg:max-w-none"
		>
			{#each data.events as event (event.slug)}
				<a href={`/events/${event.slug}`}>
					<article class="group max-w-xl flex flex-col items-start justify-between text-left panel">
						<div class="flex items-center gap-x-3 text-xs">
							<a href="#" class="relative badge-flat-hue">
								{$_(`event.category.${event.category}.name`)}
							</a>
							<time
								datetime={event.meetingTime}
								class:text-hue10={event.status === 'finished'}
								class:text-primary10={event.status === 'upcoming'}
								class:text-hue11={event.status === 'ongoing'}
							>
								{$_(`event.status.${event.status}.prefix`)}
								{event.meetingTime.toLocaleDateString()}
							</time>
						</div>
						<div class="relative">
							<h3 class="mt-3 text-lg font-semibold leading-6 text-hue12 group-hover:text-hue11">
								<span class="absolute inset-0" />
								{event.title}
							</h3>
							<p class="line-clamp-3 mt-1 text-sm leading-6 text-hue11">
								{event.description}
							</p>
						</div>
						<div class="relative mt-4 flex items-center gap-x-4">
							<div class="text-sm leading-6">
								<p class="font-semibold text-hue12">
									<a href="#">
										<span class="absolute inset-0" />
										{event.proposer}
									</a>
								</p>
								<p class="text-hue11">{$_('event.property.proposer')}</p>
							</div>
						</div>
					</article>
				</a>
			{/each}
		</div>
	</div>
</section>
