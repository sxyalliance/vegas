<script lang="ts" context="module">
	export interface Option {
		value: unknown;
		label: string;
		icon?: string;
	}
</script>

<script lang="ts">
	import { createSelect, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import Icon from '@iconify/svelte';
	import { _ } from 'svelte-i18n';
	import { derived } from 'svelte/store';

	type Options = Option[];

	interface GroupedOptions {
		[key: string]: Options;
	}

	let clazz: string | false | null = null;
	export { clazz as class };

	/**
	 * Controls the options that are displayed in the menu.
	 */
	export let options: Options | GroupedOptions = [];

	/**
	 * Shows a label for screen readers.
	 */
	export let label: string;

	/**
	 * The value of the selected option.
	 */
	export let value: unknown;

	const {
		elements: { trigger, menu, option, group, groupLabel },
		states: { selected, open },
		helpers: { isSelected }
	} = createSelect({
		forceVisible: true,
		positioning: {
			fitViewport: true
		},
		preventScroll: false
	});

	$: groupedOptions = options as GroupedOptions;
	$: flatOptions = options as Options;

	$: optionGrouped = Object.values(options).some((arr) => arr.length > 0);

	if (value) {
		const found = Object.values(options)
			.flat()
			.find((item) => item.value === value);
		selected.set({
			value: found,
			label: found.label
		});
	}

	const selectedOption = derived(selected, ($selected): Option => {
		if ($selected) {
			return $selected.value as Option;
		}
		return Object.values(options)
			.flat()
			.find((item) => item.value === value);
	});

	selectedOption.subscribe((selected) => {
		if (selected && selected.value !== value) {
			value = selected.value;
		}
	});
</script>

<div class="select {clazz}">
	<button
		class="relative w-full cursor-pointer rounded-md bg-neutral-2 py-1.5 pl-3 pr-10 text-left text-high-contrast shadow-sm ring-1 ring-inset ring-neutral-8 sm:text-sm sm:leading-6"
		use:melt={$trigger}
		aria-label={label}
	>
		<span class="flex items-center">
			{#if $selectedOption.icon}
				<Icon icon={$selectedOption.icon} class="h-5 w-5 flex-shrink-0" />
			{/if}
			<span class="ml-3 block truncate capitalize">{$_($selectedOption.label)}</span>
		</span>
		<span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
			<Icon icon="tabler:selector" class="h-5 w-5 text-neutral-9" />
		</span>
	</button>
	{#if $open}
		<div
			class="absolute z-40 mt-1 max-h-56 w-auto overflow-auto rounded-md bg-neutral-2 py-1 text-base shadow-lg ring-1 ring-neutral-6 focus:outline-none sm:text-sm"
			use:melt={$menu}
			transition:fade={{ duration: 150 }}
		>
			{#if optionGrouped}
				{#each Object.entries(groupedOptions) as [key, arr]}
					<div use:melt={$group(key)}>
						<div
							class="py-1 pl-4 pr-4 font-semibold capitalize text-high-contrast"
							use:melt={$groupLabel(key)}
						>
							{key}
						</div>
						{#each arr as item}
							<div
								class="data-[highlighted]:text-accent-fg data-[selected]:text-accent-fg relative cursor-pointer select-none py-2 pl-3
            pr-9 text-low-contrast
            data-[highlighted]:bg-accent-9 data-[selected]:bg-accent-9"
								use:melt={$option({ value: item, label: item.label })}
							>
								<div class="mr-2 flex items-center">
									{#if item.icon}
										<Icon icon={item.icon} class="h-5 w-5 flex-shrink-0" />
									{/if}
									<span
										class="ml-3 block truncate capitalize {$isSelected(item)
											? 'font-semibold'
											: 'font-normal'}"
									>
										{$_(item.label)}
									</span>
								</div>

								{#if $isSelected(item)}
									<span
										class="data-[highlighted]:text-accent-fg absolute inset-y-0 right-0 flex items-center pr-4 text-accent-9"
									>
										<Icon icon="tabler:check" class="h-5 w-5" />
									</span>
								{/if}
							</div>
						{/each}
					</div>
				{/each}
			{:else}
				{#each flatOptions as item}
					<div
						class="data-[highlighted]:text-accent-fg data-[selected]:text-accent-fg relative cursor-pointer select-none py-2 pl-3
            pr-9 text-high-contrast
            data-[highlighted]:bg-accent-9 data-[selected]:bg-accent-9"
						use:melt={$option({ value: item, label: item.label })}
					>
						<div class="mr-2 flex items-center">
							{#if item.icon}
								<Icon icon={item.icon} class="h-5 w-5 flex-shrink-0" />
							{/if}
							<span
								class="ml-3 block truncate capitalize {$isSelected(item)
									? 'font-semibold'
									: 'font-normal'}"
							>
								{$_(item.label)}
							</span>
						</div>

						<span
							class="{$isSelected(item)
								? 'flex'
								: 'hidden'} text-accent-fg absolute inset-y-0 right-0 items-center pr-4"
						>
							<Icon icon="tabler:check" class="h-5 w-5" />
						</span>
					</div>
				{/each}
			{/if}
		</div>
	{/if}
</div>
