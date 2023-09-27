<script lang="ts">
  import type { PostProperties } from "$lib/notion/types";
  import Icon from "@iconify/svelte";

  export let properties: PostProperties;
</script>

<div class="lg:col-start-3 lg:row-end-1">
  <h2 class="sr-only">Summary</h2>
  <div class="rounded-lg shadow-sm border pb-6">
    <dl class="flex flex-wrap">
      <div class="flex-auto pl-6 pt-6">
        <dt class="text-sm font-semibold leading-6 text-hue12">
          Related Personnel
        </dt>
        <dd class="mt-1 text-base font-semibold leading-6 text-hue12">
          {properties.relatedPersonnel}
        </dd>
      </div>
      <div class="flex-none self-end px-6 pt-4">
        <dt class="sr-only">Status</dt>
        <dd
          class="badge-flat-teal">
          Ongoing
        </dd>
      </div>
      <div class="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
        <dt class="flex-none">
          <span class="sr-only">Proposer</span>
          <Icon icon="tabler:user-edit" class="h-6 w-5 text-hue10" />
        </dt>
        <dd class="text-sm font-medium leading-6 text-hue12">
          {properties.proposer}
        </dd>
      </div>
      <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
        <dt class="flex-none">
          <span class="sr-only">Meeting time</span>
          <Icon icon="tabler:calendar-time" class="h-6 w-5 text-hue10" />
        </dt>
        <dd class="text-sm leading-6 text-hue11">
          <time datetime={properties.meetingTime}>
            {properties.meetingTime.toLocaleDateString()}
          </time>
        </dd>
      </div>
    </dl>
  </div>
</div>
