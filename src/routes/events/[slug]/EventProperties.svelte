<script lang="ts">
  import type { PostProperties } from "$lib/notion/types";
  import Icon from "@iconify/svelte";
  import type { EventExtraProperties } from "$lib/event";
  import { _ } from "svelte-i18n";

  export let properties: PostProperties<EventExtraProperties>;

  const list = [
    {
      type: "datetime",
      label: "meeting_time",
      value: properties.extra.meetingTime,
      icon: "tabler:calendar-time"
    },
    {
      type: "text",
      label: "meeting_point",
      value: properties.extra.meetingPoint,
      icon: "tabler:map-pin"
    },
    {
      type: "text",
      label: "event_point",
      value: properties.extra.eventPoint,
      icon: "tabler:map"
    },
    {
      type: "text",
      label: "proposer",
      value: properties.extra.proposer,
      icon: "tabler:user-edit"
    },
    {
      type: "text",
      label: "outbound_transport",
      value: properties.extra.outboundTransport,
      icon: "tabler:truck-delivery"
    },
    {
      type: "datetime",
      label: "outbound_time",
      value: properties.extra.outboundTime,
      icon: "tabler:clock-up"
    },
    {
      type: "text",
      label: "inbound_transport",
      value: properties.extra.inboundTransport,
      icon: "tabler:truck-return"
    },
    {
      type: "datetime",
      label: "inbound_time",
      value: properties.extra.inboundTime,
      icon: "tabler:clock-down"
    }
  ];
</script>

<div class="lg:col-start-3 lg:row-end-1">
  <div class="panel">
    <dl class="flex flex-wrap">
      <div class="flex-auto">
        <dt class="text-sm font-semibold leading-6 text-hue12">
          {$_('event.property.related_personnel')}
        </dt>
        <dd class="mt-1 text-base font-semibold leading-6 text-hue12">
          {properties.extra.relatedPersonnel}
        </dd>
      </div>
      <div class="flex-none self-end pt-4">
        <dt class="sr-only">
          {$_('event.property.status')}
        </dt>
        {#if properties.extra.status === 'upcoming'}
          <dd class="badge-flat-teal">{$_('event.status.upcoming.label')}</dd>
        {:else if properties.extra.status === 'finished'}
          <dd class="badge-flat-slate">{$_('event.status.finished.label')}</dd>
        {:else if properties.extra.status === 'ongoing'}
          <dd class="badge-flat-amber">{$_('event.status.ongoing.label')}</dd>
        {/if}
      </div>
      <div id="properties-list" class="grid grid-cols-1 lg:grid-cols-2 gap-y-4 border-t pt-6 mt-6">
        {#each list as { type, label, value, icon }, i (label)}
          <div class="flex w-full flex-none gap-x-4">
            <dt class="flex-none">
              <span class="sr-only">{$_(`event.property.${label}`)}</span>
              <Icon icon={icon} class="h-6 w-5 {i < 2 ? 'text-hue11' : 'text-hue10'}" />
            </dt>
            <dd class="text-sm font-medium leading-6 {i < 2 ? 'text-hue12' : 'text-hue11'}">
              {#if value}
                {#if type === "datetime"}
                  <time datetime={value}>{value.toLocaleDateString()}</time>
                {:else}
                  {value}
                {/if}
              {:else}
                N/A
              {/if}
            </dd>
          </div>
        {/each}
      </div>
    </dl>
  </div>
</div>
