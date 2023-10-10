<script lang="ts">
	import Icon from '@iconify/svelte';

	interface ButtonProps {
		size: 'small' | 'medium' | 'large';
		variant: 'solid' | 'soft' | 'surface';
		as: 'button' | 'a';
		href?: string;
		icon?: string;
	}

	export let size: ButtonProps['size'] = 'medium';
	export let variant: ButtonProps['variant'] = 'solid';
	export let as: ButtonProps['as'] = 'button';
	export let href: ButtonProps['href'];
	export let icon: ButtonProps['icon'];

	const sizes = {
		small: 'inline-flex rounded-md px-2.5 py-1.5 text-sm',
		medium: 'inline-flex rounded-md px-3 py-2 text-sm',
		large: 'inline-flex rounded-md px-3.5 py-2.5 text-sm'
	};
	const variants = {
		solid: `bg-accent-9 text-accent-fg hover:bg-accent-10`,
		soft: `bg-accentA-3 text-accentA-11 hover:bg-accentA-4 active:bg-accentA-5`,
		surface: `bg-accentA-2 text-accentA-11 border border-accentA-7 hover:border-accentA-8 active:bg-accentA-3`
	};
</script>

{#if as === 'button'}
	<button class={sizes[size] + ' ' + variants[variant]}>
		{#if icon}
			<Icon {icon} class="-ml-1 mr-1 h-5 w-5" />
		{/if}

		<slot />
	</button>
{:else if as === 'a'}
	<a class={sizes[size] + ' ' + variants[variant]} href={href || '#'}>
		{#if icon}
			<Icon {icon} class="-ml-1 mr-1 h-5 w-5" />
		{/if}

		<slot />
	</a>
{/if}
