<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	import { all as allMembers } from '$lib/shared/discord';
	import * as m from '$lib/shared/i18n/compiled/messages';
	import BrandLogo from '$lib/shared/layout/BrandLogo.svelte';
	import { Release } from '$lib/shared/shared/release';
	import { Button } from '$lib/vgui/components/ui/button';
	import { Separator } from '$lib/vgui/components/ui/separator';

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

<footer class="bg-muted" aria-labelledby="footer-heading" aria-label={m.footer_title()}>
	<div class="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
		<div class="xl:grid xl:grid-cols-3 xl:gap-8">
			<div>
				<BrandLogo class="h-24 w-auto" />
				<p class="mt-4 text-sm leading-6 text-muted-foreground">
					{m.footer_slogan()}
				</p>
				<div class="mt-2 flex">
					{#each socials as social (social.name)}
						<Button
							variant="ghost"
							size="icon"
							href={social.url}
							target="_blank"
							class="text-muted-foreground"
						>
							<Icon icon={`simple-icons:${social.name}`} class="h-4 w-4" />
						</Button>
					{/each}
				</div>
				<p class="text-xs text-transparent" aria-label="Release version">
					{Release.name}
					{Release.versionForHumans()}
				</p>
			</div>
			<div class="mt-16 hidden grid-cols-2 gap-8 lg:grid xl:col-span-2 xl:mt-0">
				<div class="md:grid md:grid-cols-2 md:gap-8">
					<div>
						<h3 class="text-sm font-semibold leading-6">
							{m.footer_helpful_resources_heading()}
						</h3>
						<ul role="list" class="mt-6 space-y-4 text-sm leading-6 text-muted-foreground">
							<li>
								<a href="/about" class="hover:text-foreground">
									{m.footer_helpful_resources_about_us()}
								</a>
							</li>
							<li>
								<a href="/about/faq" class="hover:text-foreground">
									{m.footer_helpful_resources_support_center()}
								</a>
							</li>
							<li>
								<a href="/about/contact" class="hover:text-foreground">
									{m.home_hero_contact_us()}
								</a>
							</li>
						</ul>
					</div>
					<div class="mt-10 md:mt-0" />
				</div>
				<div class="md:grid md:grid-cols-2 md:gap-8">
					<div>
						<h3 class="text-sm font-semibold leading-6">
							{m.footer_policies_heading()}
						</h3>
						<ul role="list" class="mt-6 space-y-4 text-sm leading-6 text-muted-foreground">
							<li>
								<a href="/policies/privacy" class="hover:text-foreground">
									{m.footer_policies_privacy_policy()}
								</a>
							</li>
							<li>
								<a href="/policies/cookie" class="hover:text-foreground">
									{m.footer_policies_cookie_policy()}
								</a>
							</li>
						</ul>
					</div>
					<div class="mt-10 md:mt-0">
						<h3 class="text-sm font-semibold leading-6">
							{m.footer_statistics_heading()}
						</h3>
						<ul role="list" class="mt-6 space-y-4 text-sm leading-6 text-muted-foreground">
							<li>
								<div class="relative -m-1 -mx-2 rounded-md bg-card p-1 px-2 shadow hover:shadow-md">
									{m.footer_statistics_online_members()}
									<span class="float-right inline pl-2">
										{statistics.online_members}
									</span>
								</div>
							</li>
							<li>
								{m.footer_statistics_total_members()}
								<span class="float-right inline">
									{statistics.total_members}
								</span>
							</li>
							<li>
								<div class="relative -m-1 -mx-2 rounded-md bg-card p-1 px-2 shadow hover:shadow-md">
									{m.footer_statistics_ongoing_events()}
									<span class="float-right inline pl-2">
										{statistics.ongoing_events}
									</span>
								</div>
							</li>
							<li>
								{m.footer_statistics_total_events()}
								<span class="float-right inline">
									{statistics.total_events}
								</span>
							</li>
							<li>
								{m.footer_statistics_founded_days()}
								<span class="float-right inline">
									{statistics.founded_days}
								</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<Separator class="mb-8 mt-16 sm:mt-20 lg:mt-24" />
		<div>
			<p class="text-xs leading-5 text-muted-foreground">
				{m.footer_legal()}
			</p>
		</div>
	</div>
</footer>
