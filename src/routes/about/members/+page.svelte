<script lang="ts">
	import { _ } from '$lib/shared/i18n';
	import MemberListItem from '$lib/member/MemberListItem.svelte';
	import { core, officialExcludingCore, verified } from '$lib/shared/discord';
	import SimpleHeroSection from '$lib/shared/shared/components/SimpleHeroSection.svelte';
	import Section from '$lib/vgui/section/Section.svelte';
	import SeoHandler from '$lib/shared/seo/SeoHandler.svelte';
</script>

<SeoHandler
	metaTags={{
		title: 'Our Members'
	}}
/>

<SimpleHeroSection title={_('member_hero_title')}>
	{_('member_hero_text')}
</SimpleHeroSection>

<Section>
	<div class="space-y-8 sm:space-y-12">
		<div class="space-y-5 text-left sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
			<h2 class="text-3xl font-extrabold tracking-tight text-high-contrast sm:text-4xl">
				{_('member_level_core_title')}
			</h2>
			<p class="text-xl text-low-contrast">{_('member_level_core_description')}</p>
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
			<h2 class="text-3xl font-extrabold tracking-tight text-high-contrast sm:text-4xl">
				{_('member_level_official_title')}
			</h2>
			<p class="text-xl text-low-contrast">{_('member_level_official_description')}</p>
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
			<h2 class="text-3xl font-extrabold tracking-tight text-high-contrast sm:text-4xl">
				{_('member_level_verified_title')}
			</h2>
			<p class="text-xl text-low-contrast">{_('member_level_verified_description')}</p>
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

		<div class="text-xs text-low-contrast">
			<p class="text-center">
				{_('member_source_disclaimer')}<br />
				{_('member_opt_out_guide')}<br />
				{_('member_hierarchy_disclaimer')}
			</p>
		</div>
	</div>
</Section>
