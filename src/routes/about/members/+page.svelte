<script>
	import MemberListItem from '$lib/member/MemberListItem.svelte';
	import { core, officialExcludingCore, verified } from '$lib/shared/discord';
</script>

<div class="bg-neutral-2 px-6 py-12 sm:py-20 lg:px-8">
	<div class="mx-auto max-w-2xl text-center">
		<h2 class="text-4xl font-bold tracking-tight text-high-contrast sm:text-6xl">Our Members</h2>
		<p class="mt-6 text-lg leading-8 text-low-contrast">
			We are a community of people who are passionate about life and the world around us. We are a
			diverse group of people from all walks of life, and we are united to gaming and various
			events.
		</p>
	</div>
</div>

<section class="bg-neutral-1 px-6 py-12 sm:py-20 lg:px-8">
	<div class="mx-auto max-w-7xl text-center">
		<div class="space-y-8 sm:space-y-12">
			<div class="space-y-5 text-left sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
				<h2 class="text-3xl font-extrabold tracking-tight text-high-contrast sm:text-4xl">
					Core members
				</h2>
				<p class="text-xl text-low-contrast">
					The members whom soul and heart connected to the community.
				</p>
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
	</div>
</section>

<section class="bg-neutral-2 px-6 py-12 sm:py-20 lg:px-8">
	<div class="mx-auto max-w-7xl text-center">
		<div class="space-y-8 sm:space-y-12">
			<div class="space-y-5 text-left sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
				<h2 class="text-3xl font-extrabold tracking-tight text-high-contrast sm:text-4xl">
					Official Members
				</h2>
				<p class="text-xl text-low-contrast">
					The members whom actively participate in the community.
				</p>
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
	</div>
</section>

<section class="bg-neutral-1 px-6 py-12 sm:py-20 lg:px-8">
	<div class="mx-auto max-w-7xl text-center">
		<div class="space-y-8 sm:space-y-12">
			<div class="space-y-5 text-left sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
				<h2 class="text-3xl font-extrabold tracking-tight text-high-contrast sm:text-4xl">
					Verified Members
				</h2>
				<p class="text-xl text-low-contrast">The members whom are known to the community.</p>
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
				<p>
					The above list is according to our Discord server member list. If you want to opt-out from
					this list, please contact us.<br />
					Order do not represent any hierarchy.
				</p>
			</div>
		</div>
	</div>
</section>
