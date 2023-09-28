<script lang="ts">
  import HeroSection from "./HeroSection.svelte";
  import { title } from "$lib/stores/title";
  import type { PageData } from "./$types";

  export let data: PageData;

  title.set("Events");
</script>

<HeroSection />

<section class="bg-hue1 px-4 py-12 lg:px-8 lg:py-24 sm:px-6">
  <div class="mx-auto max-w-7xl text-center">
    <div
      class="grid grid-cols-1 mx-auto max-w-2xl gap-x-8 gap-y-16 lg:grid-cols-3 lg:mx-0 lg:max-w-none"
    >
      {#each data.events as event (event.slug)}
        <article class="max-w-xl flex flex-col items-start justify-between text-left panel">
          <div class="flex items-center gap-x-3 text-xs">
            <a href="#" class="relative badge-flat-hue">
              {event.category}
            </a>
            <time
              datetime={event.extra.meetingTime}
              class:text-hue10={event.extra.status === 'finished'}
              class:text-primary10={event.extra.status === 'upcoming'}
              class:text-hue11={event.extra.status === 'ongoing'}
            >
              {#if event.extra.status === 'upcoming'}
                Upcoming on
              {:else if event.extra.status === 'finished'}
                Finished on
              {:else if event.extra.status === 'ongoing'}
                Ongoing since
              {/if}
              {event.extra.meetingTime.toLocaleDateString()}
            </time>
          </div>
          <div class="group relative">
            <h3 class="mt-3 text-lg font-semibold leading-6 text-hue12 group-hover:text-hue11">
              <a href={`/events/${event.slug}`}>
                <span class="absolute inset-0" />
                {event.title}
              </a>
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
                  {event.extra.proposer}
                </a>
              </p>
              <p class="text-hue11">Proposer</p>
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
