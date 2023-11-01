<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	import { all as allMembers } from '$lib/shared/discord';
	import { _ } from '$lib/shared/i18n';
	import BrandLogo from '$lib/shared/layout/BrandLogo.svelte';
	import { Release } from '$lib/shared/shared/release';

	let statistics = {
		online_members: -1,
		total_members: -1,
		ongoing_events: -1,
		total_events: -1,
		founded_days: -1
	};

	const fetchStatistics = async () => {
		const res = await fetch('https://discord.com/api/guilds/567268233263185922/widget.json');
		const data = await res.json();
		return {
			online_members: data.presence_count,
			total_members: allMembers.length,
			ongoing_events: -1,
			total_events: -1,
			founded_days: Math.floor((Date.now() - new Date('2019-04-15').getTime()) / 86400000)
		};
	};

	const socials = [
		{
			name: 'discord',
			url: '/about/contact#discord'
		},
		{
			name: 'github',
			url: 'https://github.com/sxyalliance'
		},
		{
			name: 'youtube',
			url: 'https://www.youtube.com/channel/UCjK-L4rgIyQA2kRTGb8iCvA'
		}
	];

	onMount(async () => {
		statistics = await fetchStatistics();
	});
</script>

<footer class="bg-neutral-2" aria-labelledby="footer-heading" aria-label={_('footer_title')}>
	<div class="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
		<div class="xl:grid xl:grid-cols-3 xl:gap-8">
			<div class="space-y-4">
				<BrandLogo class="h-24 w-auto" />
				<p class="text-sm leading-6 text-low-contrast">
					{_('footer_slogan')}
				</p>
				<div class="flex space-x-6">
					{#each socials as social (social.name)}
						<a href={social.url} target="_blank" class="text-neutral-9 hover:text-neutral-10">
							<span class="sr-only">{social.name}</span>
							<Icon icon={`simple-icons:${social.name}`} class="h-6 w-6" />
						</a>
					{/each}
				</div>
				<p class="text-xs text-low-contrast" aria-label="Release">
					{Release.name}
					{Release.versionForHumans()}
				</p>
			</div>
			<div class="mt-16 hidden grid-cols-2 gap-8 lg:grid xl:col-span-2 xl:mt-0">
				<div class="md:grid md:grid-cols-2 md:gap-8">
					<div>
						<h3 class="text-sm font-semibold leading-6 text-high-contrast">
							{_('footer_helpful_resources_heading')}
						</h3>
						<ul role="list" class="mt-6 space-y-4 text-sm leading-6 text-low-contrast">
							<li>
								<a href="/about" class="hover:text-high-contrast">
									{_('footer_helpful_resources_about_us')}
								</a>
							</li>
							<li>
								<a href="/about/faq" class="hover:text-high-contrast">
									{_('footer_helpful_resources_support_center')}
								</a>
							</li>
							<li>
								<a href="/about/contact" class="hover:text-high-contrast">
									{_('footer_helpful_resources_contact_us')}
								</a>
							</li>
						</ul>
					</div>
					<div class="mt-10 md:mt-0" />
				</div>
				<div class="md:grid md:grid-cols-2 md:gap-8">
					<div>
						<h3 class="text-sm font-semibold leading-6 text-high-contrast">
							{_('footer_policies_heading')}
						</h3>
						<ul role="list" class="mt-6 space-y-4 text-sm leading-6 text-low-contrast">
							<li>
								<a href="/policies/privacy" class="hover:text-high-contrast">
									{_('footer_policies_privacy_policy')}
								</a>
							</li>
							<li>
								<a href="/policies/cookies" class="hover:text-high-contrast">
									{_('footer_policies_cookie_policy')}
								</a>
							</li>
						</ul>
					</div>
					<div class="mt-10 md:mt-0">
						<h3 class="text-sm font-semibold leading-6 text-high-contrast">
							{_('footer_statistics_heading')}
						</h3>
						<ul role="list" class="mt-6 space-y-4 text-sm leading-6 text-low-contrast">
							<li>
								<div
									class="relative -m-1 -mx-2 rounded-md bg-neutral-3 p-1 px-2 shadow hover:shadow-md"
								>
									{_('footer_statistics_online_members')}
									<span class="float-right inline pl-2 text-low-contrast">
										{statistics.online_members}
									</span>
									{#if statistics.online_members === -1}
										<span class="absolute right-0 top-0 -mr-1 -mt-1 flex h-3 w-3">
											<span
												class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-9 opacity-75"
											/>
											<span class="relative inline-flex h-3 w-3 rounded-full bg-accent-9" />
										</span>
									{/if}
								</div>
							</li>
							<li>
								{_('footer_statistics_total_members')}
								<span class="float-right inline text-low-contrast">
									{statistics.total_members}
								</span>
							</li>
							<li>
								<div
									class="relative -m-1 -mx-2 rounded-md bg-neutral-3 p-1 px-2 shadow hover:shadow-md"
								>
									{_('footer_statistics_ongoing_events')}
									<span class="float-right inline pl-2 text-low-contrast">
										{statistics.ongoing_events}
									</span>
									{#if statistics.ongoing_events === -1}
										<span class="absolute right-0 top-0 -mr-1 -mt-1 flex h-3 w-3">
											<span
												class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-9 opacity-75"
											/>
											<span class="relative inline-flex h-3 w-3 rounded-full bg-accent-9" />
										</span>
									{/if}
								</div>
							</li>
							<li>
								{_('footer_statistics_total_events')}
								<span class="float-right inline text-low-contrast">
									{statistics.total_events}
								</span>
							</li>
							<li>
								{_('footer_statistics_founded_days')}
								<span class="float-right inline text-low-contrast">
									{statistics.founded_days}
								</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="mt-16 border-t border-neutral-6 pt-8 sm:mt-20 lg:mt-24">
			<p class="text-xs leading-5 text-low-contrast">
				{_('footer_legal')}
			</p>
		</div>
	</div>
</footer>
