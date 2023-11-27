<script lang="ts">
	import * as m from '$i18n/messages';
	import MemberListItem from '$lib/member/MemberListItem.svelte';
	import { all } from '$lib/shared/discord';
	import Section from '$lib/vgui/section/Section.svelte';

	const people = all;
</script>

<Section {...$$restProps}>
	<div class="space-y-8 text-center sm:space-y-12">
		<div class="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-3xl">
			<h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">
				{m.home_member_title()}
			</h2>
			<p class="text-xl text-muted-foreground">
				{m.member_hero_text()}
			</p>
		</div>
		<ul
			role="list"
			class="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6"
		>
			{#each people as member}
				<MemberListItem
					name={member.name}
					role={member.role}
					avatar={member.avatar}
					username={member.username}
					tags={member.roles}
					date="{member.joined_at},"
				/>
			{/each}
		</ul>

		<div class="text-xs text-muted-foreground">
			<p>{m.home_member_note()}</p>
		</div>
	</div>
</Section>
