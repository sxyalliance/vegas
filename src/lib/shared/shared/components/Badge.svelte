<script lang="ts">
	interface BadgeProps {
		size: 'small' | 'large';
		variant: 'solid' | 'soft' | 'surface';
		color: 'accent' | 'teal' | 'slate' | 'amber';
	}

	export let size: BadgeProps['size'] = 'small';
	export let variant: BadgeProps['variant'] = 'solid';
	export let color: BadgeProps['color'] = 'accent';

	const sizes = {
		small: 'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
		large: 'inline-flex items-center rounded-md px-3 py-1 text-sm font-medium'
	};
	const variants = {
		solid: {
			accent: 'bg-accent-9 text-accent-fg',
			teal: 'bg-teal-9 text-teal-fg',
			slate: 'bg-slate-9 text-slate-fg',
			amber: 'bg-amber-9 text-amber-fg'
		},
		soft: {
			accent: 'bg-accentA-3 text-accentA-11',
			teal: 'bg-tealA-3 text-tealA-11',
			slate: 'bg-slateA-3 text-slateA-11',
			amber: 'bg-amberA-3 text-amberA-11'
		},
		surface: {
			accent: 'bg-accentA-1 text-accentA-11 border border-accentA-6',
			teal: 'bg-tealA-1 text-tealA-11 border border-tealA-6',
			slate: 'bg-slateA-1 text-slateA-11 border border-slateA-6',
			amber: 'bg-amberA-1 text-amberA-11 border border-amberA-6'
		}
	};
</script>

<span class={sizes[size] + ' ' + variants[variant][color]}>
	<slot />
</span>
