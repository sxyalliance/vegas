<script lang="ts">
	export let color: string;

	const colorVariants: Record<string, string> = {
		accent: 'bg-accent-3 border border-accent-7 hover:border-accent-8 text-accent-11',
		teal: 'bg-teal-3 border border-teal-7 hover:border-teal-8 text-teal-11',
		slate: 'bg-slate-3 border border-slate-7 hover:border-slate-8 text-slate-11',
		amber: 'bg-amber-3 border border-amber-7 hover:border-amber-8 text-amber-11'
	};

	if (!colorVariants[color]) {
		throw new Error(`Invalid color: ${color}`);
	}

	const colorClass = colorVariants[color];
</script>

<span class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium {colorClass}">
	<slot />
</span>
