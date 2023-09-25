<script lang="ts">
	import HeroSection from './HeroSection.svelte';
	import { title } from '$lib/stores/title';
	import type { PageData } from './$types';

	export let data: PageData;

	title.set('Events');
</script>

<HeroSection />

<section class="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
	<div
		class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3"
	>
		{#each data.events as event (event.slug)}
			<article class="flex max-w-xl flex-col items-start justify-between text-left">
				<div class="flex items-center gap-x-4 text-xs">
					<time datetime={event.meetingTime} class="text-hue10">
						{event.meetingTime.toLocaleDateString()}
					</time>
					<a
						href="#"
						class="relative z-10 rounded-full bg-hue3 px-3 py-1.5 font-medium text-hue11 hover:bg-hue4"
					>
						{event.category}
					</a>
				</div>
				<div class="group relative">
					<h3 class="mt-3 text-lg font-semibold leading-6 text-hue12 group-hover:text-hue11">
						<a href={`/events/${event.slug}`}>
							<span class="absolute inset-0" />
							{event.title}
						</a>
					</h3>
					<p class="mt-5 line-clamp-3 text-sm leading-6 text-hue11">
						{event.description}
					</p>
				</div>
				<div class="relative mt-8 flex items-center gap-x-4">
					<div class="text-sm leading-6">
						<p class="font-semibold text-hue12">
							<a href="#">
								<span class="absolute inset-0" />
								{event.proposer}
							</a>
						</p>
						<p class="text-hue11">Proposer</p>
					</div>
				</div>
			</article>
		{/each}
	</div>
</section>
