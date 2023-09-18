<script lang="ts">
  import dictionary from "$lib/api/dictionary.json"
  import {_} from "svelte-i18n";

  const spotted: { phrase: string, definition: string }[] = dictionary
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)
</script>

<section class="py-24 bg-gray-50">
    <div class="max-w-4xl mx-auto">
        <div class="text-center text-xs text-gray-500 mb-4">
            <p>{$_('home.dictionary.note')}</p>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {#each spotted as spot (spot.phrase)}
                <div class="relative rounded-lg bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <div class="flex-1 min-w-0">
                        <span class="absolute inset-0" aria-hidden="true"/>
                        <p class="text-sm font-medium inline-flex px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-800">
                            {spot.phrase}
                        </p>
                        <p class="text-sm text-gray-500 mt-1">
                            {spot.definition}
                        </p>
                    </div>
                </div>
            {/each}
        </div>

        <div class="mx-auto text-center py-6 px-4 sm:px-6 lg:py-8 lg:px-8">
            <a
                    href="/dictionary"
                    class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
            >
                {$_('home.dictionary.view_more')}
            </a>
        </div>
    </div>
</section>
