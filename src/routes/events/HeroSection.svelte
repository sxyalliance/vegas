<script lang="ts">
  import Icon from "@iconify/svelte";
  import { _ } from "svelte-i18n";
  import { CategoryKey } from "$lib/types/event";
  import { getCategoryByKey } from "$lib/data/event";

  function gridConfigOf(categoryKey: CategoryKey, code: string) {
    const category = getCategoryByKey(categoryKey);
    return {
      code,
      key: category.key,
      icon: category.icon,
      color: category.color
    };
  }

  const gridSchema = [
    [
      gridConfigOf(CategoryKey.DINING, "01"),
      gridConfigOf(CategoryKey.ENTERTAINMENT, "02")
    ],
    [
      { code: null },
      gridConfigOf(CategoryKey.ACADEMIC, "03"),
      { code: null }
    ],
    [
      gridConfigOf(CategoryKey.SPORT, "04"),
      gridConfigOf(CategoryKey.GIVEAWAY, "05")
    ]
  ];
</script>

<div class="relative isolate overflow-hidden bg-hue2 h-[100vh]">
  <div class="pt-16 pb-12 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
      <div class="sm:max-w-lg">
        <h1 class="text-4xl font font-extrabold tracking-tight text-hue12 sm:text-6xl">
          {$_('event.list.hero.title')}
        </h1>
        <p class="mt-4 text-xl text-hue11">
          {$_('event.list.hero.text')}
        </p>
      </div>
      <div class="hidden md:block">
        <div class="mt-10">
          <div
            aria-hidden="true"
            class="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full"
          >
            <div
              class="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
              <div class="flex items-center space-x-6 lg:space-x-8">
                {#each gridSchema as grid}
                  <div class="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                    {#each grid as category, i (i)}
                      {#if category.code === null}
                        <div class="w-44 h-64 rounded-lg overflow-hidden" />
                      {:else}
                        <div class="w-44 h-64 rounded-lg overflow-hidden shadow">
                          <div class="bg-hue1 overflow-hidden rounded-lg w-full h-full">
                            <div class="px-2 py-3 sm:p-4">
                              <div class="relative mb-4">
                                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                                  <div class="w-full border-t border-hue6" />
                                </div>
                                <div class="relative flex justify-start">
                                <span class="pr-3 bg-hue1 text-sm font-medium text-hue10">
                                  {category.code}
                                </span>
                                </div>
                              </div>

                              <Icon icon={category.icon} class="h-12 w-12 mb-4 {category.color}" />

                              <h2 class="text-lg leading-6 font-medium text-hue12">
                                {$_(`event.category.${category.key}.name`)}
                              </h2>
                              <p class="mt-2 text-base text-hue11">
                                {$_(`event.category.${category.key}.description`)}
                              </p>
                            </div>
                          </div>
                        </div>
                      {/if}
                    {/each}
                  </div>
                {/each}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
