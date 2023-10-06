<script lang="ts">
  import HeroSection from "./HeroSection.svelte";
  import { title } from "$lib/layout/title";
  import type { PageData } from "./$types";
  import { _ } from "svelte-i18n";
  import { getCategoryByKey } from "$lib/event";
  import dayjs from "dayjs";

  export let data: PageData;

  title.set("Events");
</script>

<HeroSection />

<section class="bg-hue1 px-4 py-12 lg:px-8 lg:py-24 sm:px-6">
  <div class="mx-auto max-w-7xl">
    <div class="grid grid-cols-1 space-y-16 lg:space-y-16">
      {#each data.events as event (event.slug)}
        {@const meetingDay = dayjs(event.meetingTime)}
        {@const today = dayjs()}
        <a href={`/events/${event.slug}`}>
          <article class="relative isolate flex flex-col lg:flex-row gap-10 justify-between bg-hue3">
            <div class="flex-none p-6 pb-0 lg:pb-6 pr-0">
              <div class="group relative max-w-xl text-hue12">
                <span class="text-xl">
                  {#if meetingDay.isSame(today, 'day')}
                    {$_('event.status.ongoing.label')}
                  {:else if meetingDay.isBefore(today, 'day')}
                    {$_('event.status.finished.label')}
                  {:else}
                    {$_('event.status.upcoming.label')}
                  {/if}
                  Event
                </span>
                <h2 class="mt-1 text-2xl font-semibold leading-6">
                  {$_(`event.status.${event.status}.label`)}
                  {meetingDay.fromNow()}
                </h2>
              </div>
              <div class="mt-6 flex">
                <div class="relative flex items-center gap-x-4">
                  <!-- Meeting Time (Bookmark effect) -->
                  <div
                    class="relative top-0 -left-10 p-2 pl-2 pr-4 font-bold text-primary-fg bg-{getCategoryByKey(event.category).color}">
                    <div
                      class="absolute top-17 left-0 border-8 border-l-transparent border-b-transparent border-{getCategoryByKey(event.category).color}"></div>
                    <time class="sr-only" datetime={event.meetingTime}>{event.meetingTime.toLocaleDateString()}</time>
                    <div class="flex" aria-hidden="true">
                      <div class="mr-2 flex-shrink-0 self-center">
                        <span class="text-3xl">{event.meetingTime.getDate().toString().padStart(2, '0')}</span>
                      </div>
                      <div class="w-23">
                        <h4 class="text-lg font-bold">
                          {event.meetingTime.toLocaleString('en-US', { month: 'long' })}
                        </h4>
                        <span class="mt-1">{event.meetingTime.getFullYear()}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Event Name & Proposer -->
                  <div class="-ml-8">
                  <span class="font-semibold text-hue12">
                    {$_('event.property.proposer')}
                  </span>
                    <p class="text-hue11 text-sm truncate w-[12ch]">{event.proposer}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="px-6 lg:(px-0 py-6) lg:(flex flex-col place-content-center) min-w-prose">
              <div class="text-5xl font-bold text-hue12">
                {event.title}
              </div>
              <p class="line-clamp-3 text-hue11 mt-2">
                {event.description}
              </p>
            </div>

            <div>
              <img src="https://placehold.co/640x360?text=16:9" class="h-full object-cover"
                   alt="Promotion cover of this event" />
            </div>
          </article>
        </a>
      {/each}
    </div>
  </div>
</section>
