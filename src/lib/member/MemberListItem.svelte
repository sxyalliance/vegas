<script lang="ts">
	import { createLinkPreview, melt } from '@melt-ui/svelte';
	import Img from '@zerodevx/svelte-img';
	import { fly } from 'svelte/transition';

	import Badge from '$lib/vgui/badge/Badge.svelte';

	export let avatar: unknown;
	export let name: string;
	export let role: string;

	export let username: string;
	export let tags: string[];
	export let date: string;

	const {
		elements: { trigger, content, arrow },
		states: { open }
	} = createLinkPreview({
		forceVisible: true
	});
</script>

<li use:melt={$trigger}>
	<Img src={avatar} alt={'Avatar of ' + name} class="mx-auto h-24 w-24 rounded-full" />
	<h3
		class="text-high-contrast mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold leading-7 tracking-tight"
	>
		{name}
	</h3>
	<p class="text-low-contrast text-sm leading-6">{role}</p>
</li>

{#if $open}
	<div
		use:melt={$content}
		transition:fly={{ y: -5, duration: 100 }}
		class="bg-neutral-3 z-10 rounded-md shadow-sm"
	>
		<div class="bg-neutral-3 w-[300px] rounded-md p-5 shadow-sm">
			<div class="flex flex-col gap-2">
				<Img
					src={avatar}
					alt={'Avatar of ' + name}
					class="object-fit block h-14 w-14 rounded-full p-1"
				/>
				<div class="flex flex-col gap-4">
					<div>
						<div class="text-high-contrast font-bold">{name}</div>
						<div class="text-low-contrast">{username}</div>
					</div>
				</div>
				<div class="text-low-contrast m-0">
					{#each tags as tag}
						<Badge variant="surface" class="mx-0.5 my-0.5">{tag}</Badge>
					{/each}
				</div>
				<div class="flex gap-4">
					<div class="flex gap-1">
						<div class="text-low-contrast">Joined at</div>
						<div class="text-high-contrast">{date}</div>
					</div>
				</div>
			</div>
		</div>
		<div use:melt={$arrow} />
	</div>
{/if}
