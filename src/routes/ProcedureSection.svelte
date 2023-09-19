<script lang="ts">
  import {_} from "svelte-i18n";
</script>

<section class="bg-hue1">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
        <div>
            <h2 class="text-base font-semibold text-primary10 uppercase tracking-wide">
                {$_('home.procedure.subtitle')}
            </h2>
            <p class="mt-2 text-3xl font-extrabold text-hue12">
                {$_('home.procedure.title')}
            </p>
            <p class="mt-4 text-lg text-hue11">
                {$_('home.procedure.text')}
            </p>
        </div>
        <div class="mt-12 lg:mt-0 lg:col-span-2">
            <dl class="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:grid-rows-3 sm:grid-flow-col sm:gap-x-6 sm:gap-y-10 lg:gap-x-8">
                {#each {length: 6} as x, i (i)}
                    <div class="relative">
                        <dt>
                            <span class="absolute text-2xl text-primary10">{i + 1}</span>
                            <p class="ml-9 text-lg leading-6 font-medium text-hue12">
                                {$_(`home.procedure.steps.${i + 1}.name`)}
                            </p>
                        </dt>
                        <dd class="mt-2 ml-9 text-base text-hue11">
                            {$_(`home.procedure.steps.${i + 1}.description`)}
                        </dd>
                    </div>
                {/each}
            </dl>
        </div>
    </div>
</section>
