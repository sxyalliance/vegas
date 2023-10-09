<script lang="ts">
	import { _ } from 'svelte-i18n';
	import {
		Listbox,
		ListboxButton,
		ListboxOption,
		ListboxOptions
	} from '@rgossiaux/svelte-headlessui';
	import Icon from '@iconify/svelte';

	interface SelectOption {
		value: string;
		label: string;
		icon: string;
	}

	export let label: string;
	export let options: SelectOption[] = [];
	export let value: string;
	export let alternativeLabelMap: Record<string, string> = {};

	let clazz = '';
	export { clazz as class };

	$: matchedValue = options.find((option) => option.value === value) || options[0];

	const getLabel = (label: string) => {
		if (alternativeLabelMap[label]) {
			return alternativeLabelMap[label];
		}
		return $_(label);
	};
</script>

<Listbox bind:value aria-label={label}>
	<div class={clazz}>
		<ListboxButton
			class="relative w-full cursor-pointer rounded-md bg-neutral-2 py-1.5 pl-3 pr-10 text-left text-high-contrast shadow-sm ring-1 ring-inset ring-neutral-8 sm:text-sm sm:leading-6"
		>
			<span class="flex items-center">
				<Icon icon={matchedValue.icon} class="h-5 w-5 flex-shrink-0" />
				<span class="ml-3 block truncate capitalize">{getLabel(matchedValue.label)}</span>
			</span>
			<span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
				<Icon icon="tabler:selector" class="h-5 w-5 text-neutral-9" />
			</span>
		</ListboxButton>

		<ListboxOptions
			class="absolute z-10 mt-1 max-h-56 w-auto overflow-auto rounded-md bg-neutral-3 py-1 text-base shadow-lg ring-1 ring-neutral-7 focus:outline-none sm:text-sm"
		>
			{#each options as option (option.value)}
				<ListboxOption value={option.value} let:selected let:active>
					<li
						class="relative cursor-pointer select-none py-2 pl-3 pr-9 {active
							? 'bg-accent-5 text-accent-12'
							: 'text-high-contrast'}"
					>
						<div class="mr-2 flex items-center">
							<Icon icon={option.icon} class="h-5 w-5 flex-shrink-0" />
							<span
								class="ml-3 block truncate capitalize {selected ? 'font-semibold' : 'font-normal'}"
							>
								{getLabel(option.label)}
							</span>
						</div>

						{#if selected}
							<span
								class="absolute inset-y-0 right-0 flex items-center pr-4 {active
									? ' text-accent-10'
									: ' text-accent-9'}"
							>
								<Icon icon="tabler:check" class="h-5 w-5" />
							</span>
						{/if}
					</li>
				</ListboxOption>
			{/each}
		</ListboxOptions>
	</div>
</Listbox>
