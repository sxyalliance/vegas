<script lang="ts">
	import { writable } from 'svelte/store';

	import Select from '$lib/vgui/select/Select.svelte';

	import type { Hst } from '@histoire/plugin-svelte';

	// eslint-disable-next-line no-import-assign
	export let Hst: Hst;

	let simpleValue = writable('option-1');
	let groupedValue = writable('option-1-1');

	const icons = [
		'tabler:helicopter',
		'tabler:satellite',
		'tabler:plane',
		'tabler:planet',
		'tabler:discount-check'
	];

	const simpleOptions = Array.from({ length: 5 }, (_, i) => ({
		label: `Option ${i + 1}`,
		value: `option-${i + 1}`,
		icon: icons[i % icons.length]
	}));

	const groupedOptions = {
		'group 1': Array.from({ length: 5 }, (_, i) => ({
			label: `Option 1 ${i + 1}`,
			value: `option-1-${i + 1}`,
			icon: icons[i % icons.length]
		})),
		'group 2': Array.from({ length: 5 }, (_, i) => ({
			label: `Option 2 ${i + 1}`,
			value: `option-2-${i + 1}`,
			icon: icons[i % icons.length]
		}))
	};
</script>

<Hst.Story>
	<Hst.Variant title="Simple">
		<Select class="w-fit" options={simpleOptions} bind:value={$simpleValue} label="Select" />
	</Hst.Variant>

	<Hst.Variant title="Grouped">
		<Select class="w-fit" options={groupedOptions} bind:value={$groupedValue} label="Select" />
	</Hst.Variant>
</Hst.Story>
