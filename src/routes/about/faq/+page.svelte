<script lang="ts">
  import { Disclosure, DisclosureButton, DisclosurePanel } from "@rgossiaux/svelte-headlessui";
  import Icon from "@iconify/svelte";

  interface FrequentlyAskedQuestionSection {
    title: string;
    questions: FrequentlyAskedQuestion[];
  }

  interface FrequentlyAskedQuestion {
    question: string;
    answer: string;
  }

  const faq: FrequentlyAskedQuestionSection[] = [
    {
      key: "general",
      questions: [
        {
          question: "Why has some text not been translated?",
          answer: "Since we rely on volunteers to complete our localization work, we must wait until volunteers are available to finish the localization work in the other languages after the source language (English) has been updated. As a result, please be aware that delays frequently accompany the localization of other languages.\n"
        },
        {
          question: "Why are just a few browsers fully supported?",
          answer: "Our output is constrained. There are just a handful of individuals who regularly maintain our website. We gave up the ideal experience of other browsers because they often take a lot of time. With the time saved, we want to create more features and functions.\nWe will think about using the remaining time to gradually make the website compatible with other browsers after it is stable overall.\n"
        }
      ]
    },
    {
      key: "gaming_calendar",
      questions: [
        {
          question: "Q",
          answer: "A"
        }
      ]
    }
  ];
</script>

<div class="bg-hue1 px-6 pt-36 lg:px-8 pb-16 sm:pb-24">
  <div class="mx-auto max-w-2xl text-center">
    <p class="text-base font-semibold leading-7 text-primary10">Get the answer you want</p>
    <h2 class="mt-2 text-4xl font-bold tracking-tight text-hue12 sm:text-6xl">Support Center</h2>
  </div>
</div>

<div class="bg-hue2">
  <div class="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8 lg:py-20 space-y-10">
    {#each faq as section}
      <div class="mx-auto max-w-4xl divide-y divide-hue5" id={section.key}>
        <h2 class="text-2xl font-bold leading-10 tracking-tight text-hue12">{section.key}</h2>
        <dl class="mt-2 space-y-6 divide-y divide-hue4">
          {#each section.questions as question}
            <Disclosure as="div" class="pt-4" let:open>
              <dt>
                <DisclosureButton class="flex w-full items-start justify-between text-left text-hue12">
                  <span class="text-base font-semibold leading-7">{question.question}</span>
                  <span class="ml-6 flex h-7 items-center">
                {#if (!open)}
                  <Icon icon="tabler:plus" class="h-6 w-6" aria-hidden="true" />
                {:else}
                  <Icon icon="tabler:minus" class="h-6 w-6" aria-hidden="true" />
                {/if}
              </span>
                </DisclosureButton>
              </dt>
              <DisclosurePanel as="dd" class="mt-2 pr-12">
                <p class="text-base leading-7 text-hue11">{question.answer}</p>
              </DisclosurePanel>
            </Disclosure>
          {/each}
        </dl>
      </div>
    {/each}
  </div>
</div>
