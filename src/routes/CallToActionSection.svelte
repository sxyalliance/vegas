<script>
  import {_} from "svelte-i18n";
</script>

<!-- CTA section -->
<div class="py-24 overflow-hidden">
    <div class="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
        <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
            <div class="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {$_('home.cta.title')}
                </h2>
                <p class="mt-6 text-xl leading-8 text-gray-600">
                    {$_('home.cta.text')}
                </p>
                <p class="mt-6 text-base leading-7 text-gray-600">
                    {$_('home.cta.hint')}
                </p>
                <div class="mt-10 flex">
                    <a href="#"
                       class="btn-primary btn-xl">
                        {$_('home.cta.action')}
                        <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </div>
            <div class="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
                <div class="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                    <img src="https://placehold.co/600x400?text=Some+illustration"
                         alt="" class="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"/>
                </div>
                <div class="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                    <div class="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                        <img src="https://placehold.co/600x400"
                             alt=""
                             class="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"/>
                    </div>
                    <div class="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                        <img src="https://placehold.co/600x400"
                             alt=""
                             class="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"/>
                    </div>
                    <div class="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                        <img src="https://placehold.co/600x400"
                             alt="" class="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
