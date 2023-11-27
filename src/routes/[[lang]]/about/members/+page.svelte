<script lang="ts">
	import * as m from '$i18n/messages';
	import MemberListItem from '$lib/member/MemberListItem.svelte';
	import { core, officialExcludingCore, verified } from '$lib/shared/discord';
	import SeoHandler from '$lib/shared/seo/SeoHandler.svelte';
	import SimpleHeroSection from '$lib/shared/shared/components/SimpleHeroSection.svelte';
	import Section from '$lib/vgui/section/Section.svelte';
</script>

<SeoHandler
	metaTags={{
		title: 'Our Members'
	}}
/>

<SimpleHeroSection title={m.member_hero_title()}>
	{m.member_hero_text()}
</SimpleHeroSection>

<Section>
	<div class="space-y-8 sm:space-y-12">
		<div class="space-y-5 text-left sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
			<h2 class="text-high-contrast text-3xl font-extrabold tracking-tight sm:text-4xl">
				{m.member_level_core_title()}
			</h2>
			<p class="text-low-contrast text-xl">{m.member_level_core_description()}</p>
		</div>
		<ul
			role="list"
			class="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6"
		>
			{#each core as member}
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
	</div>
</Section>

<Section alternate>
	<div class="space-y-8 sm:space-y-12">
		<div class="space-y-5 text-left sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
			<h2 class="text-high-contrast text-3xl font-extrabold tracking-tight sm:text-4xl">
				{m.member_level_official_title()}
			</h2>
			<p class="text-low-contrast text-xl">{m.member_level_official_description()}</p>
		</div>
		<ul
			role="list"
			class="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6"
		>
			{#each officialExcludingCore as member}
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
	</div>
</Section>

<Section>
	<div class="space-y-8 sm:space-y-12">
		<div class="space-y-5 text-left sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
			<h2 class="text-high-contrast text-3xl font-extrabold tracking-tight sm:text-4xl">
				{m.member_level_verified_title()}
			</h2>
			<p class="text-low-contrast text-xl">{m.member_level_verified_description()}</p>
		</div>
		<ul
			role="list"
			class="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6"
		>
			{#each verified as member}
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

		<div class="text-low-contrast text-xs">
			<p class="text-center">
				{m.member_source_disclaimer()}<br />
				{m.member_opt_out_guide()}<br />
				{m.member_hierarchy_disclaimer()}
			</p>
		</div>
	</div>
</Section>
