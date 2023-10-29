<script lang="ts">
	import { _ } from '$lib/shared/i18n';
	import type { NavigationDefinition } from '$lib/shared/layout/header/navigation/types';

	export let definition: NavigationDefinition;
</script>

<ol class="hidden">
	{#each definition as item (item.name)}
		{#if item.type === 'pure'}
			<li>
				<a href={item.href}>{_(item.name)}</a>
			</li>
		{:else if item.type === 'flyout'}
			<li>
				<ol>
					{#each item.flyout.items as flyoutItem (flyoutItem.name)}
						<li>
							<a href={flyoutItem.href}>{_(flyoutItem.name)}</a>
							{#if flyoutItem.description}
								<p>{_(flyoutItem.description)}</p>
							{/if}
						</li>
					{/each}
				</ol>
			</li>
		{/if}
	{/each}
</ol>
