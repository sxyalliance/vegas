<script lang="ts">
	import { Disclosure, DisclosureButton, DisclosurePanel } from '@rgossiaux/svelte-headlessui';
	import Icon from '@iconify/svelte';
	import SimpleHeroSection from '$lib/shared/shared/components/SimpleHeroSection.svelte';
	import Section from '$lib/vgui/section/Section.svelte';

	interface FrequentlyAskedQuestionSection {
		key: string;
		questions: FrequentlyAskedQuestion[];
	}

	interface FrequentlyAskedQuestion {
		question: string;
		answer: string;
	}

	const faq: FrequentlyAskedQuestionSection[] = [
		{
			key: 'general',
			questions: [
				{
					question: 'Why has some text not been translated?',
					answer:
						'Since we rely on volunteers to complete our localization work, we must wait until volunteers are available to finish the localization work in the other languages after the source language (English) has been updated. As a result, please be aware that delays frequently accompany the localization of other languages.\n'
				},
				{
					question: 'Why are just a few browsers fully supported?',
					answer:
						'Our output is constrained. There are just a handful of individuals who regularly maintain our website. We gave up the ideal experience of other browsers because they often take a lot of time. With the time saved, we want to create more features and functions.\nWe will think about using the remaining time to gradually make the website compatible with other browsers after it is stable overall.\n'
				}
			]
		},
		{
			key: 'gaming_calendar',
			questions: [
				{
					question: 'Q',
					answer: 'A'
				}
			]
		}
	];
</script>

<SimpleHeroSection title="Support Center" tagline="Get the answer you want" />

<Section>
	<div class="space-y-10">
		{#each faq as section}
			<div class="mx-auto max-w-4xl divide-y divide-neutral-6" id={section.key}>
				<h2 class="text-2xl font-bold leading-10 tracking-tight text-high-contrast">
					{section.key}
				</h2>
				<dl class="mt-2 space-y-6 divide-y divide-neutral-6">
					{#each section.questions as question}
						<Disclosure as="div" class="pt-4" let:open>
							<dt>
								<DisclosureButton
									class="flex w-full items-start justify-between text-left text-high-contrast"
								>
									<span class="text-base font-semibold leading-7">{question.question}</span>
									<span class="ml-6 flex h-7 items-center">
										{#if !open}
											<Icon icon="tabler:plus" class="h-6 w-6" aria-hidden="true" />
										{:else}
											<Icon icon="tabler:minus" class="h-6 w-6" aria-hidden="true" />
										{/if}
									</span>
								</DisclosureButton>
							</dt>
							<DisclosurePanel as="dd" class="mt-2 pr-12">
								<p class="text-base leading-7 text-low-contrast">{question.answer}</p>
							</DisclosurePanel>
						</Disclosure>
					{/each}
				</dl>
			</div>
		{/each}
	</div>
</Section>
