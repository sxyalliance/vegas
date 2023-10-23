<script>
  import { _ } from "$lib/shared/i18n";
  import { FxParallax as Img } from "@zerodevx/svelte-img";

  import cover from "$lib/assets/home_hero_cover-e.png?as=run:48&blur=30";
  import Button from "$lib/shared/shared/components/button/Button.svelte";
</script>

<!-- Hero section -->
<div class="h-hero relative isolate overflow-hidden bg-neutral-1">
  <div
    class="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-40"
    aria-hidden="true"
  >
    <div
      class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
      style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
    />
  </div>
  <div class="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
    <div class="px-6 pb-12 pt-10 sm:pb-32 lg:col-span-6 lg:px-0 lg:pb-56 lg:pt-44 xl:col-span-5">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <div class="hidden sm:flex">
          <div
            class="relative rounded-full px-3 py-1 text-sm leading-6 text-low-contrast ring-1 ring-neutral-7 hover:ring-neutral-8"
          >
            {_('home_hero_build_better_internet')}
            <a href="https://www.mozilla.org/en-US/about/manifesto" target="_blank"
               class="whitespace-nowrap font-semibold text-accent-11">
              <span class="absolute inset-0" aria-hidden="true" />
              {_('home_hero_build_better_internet_learn_more')}
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <h1 class="mt-10 text-4xl font-bold tracking-tight text-high-contrast sm:text-6xl">
					<span class="bg-rainbow bg-clip-text text-transparent">
						{_('home_hero_title')}
					</span>
        </h1>
        <p class="mt-6 text-lg leading-8 text-low-contrast">
          {_('home_hero_text')}
        </p>
        <div class="mt-10 flex items-center gap-x-6">
          <Button size="large" href="/about/contact">
            {_('home_hero_contact_us')}
          </Button>
          <a href="/events" class="text-sm font-semibold leading-6 text-high-contrast">
            {_('home_hero_check_events')}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
    <div class="relative lg:col-span-6 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
      <Img
        class="aspect-[3/2] w-full object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
        src={cover}
        alt="Group of SXYA Members"
        factor={0.95}
      />
    </div>
  </div>
</div>
