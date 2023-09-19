<script>
  import {_} from 'svelte-i18n'

  import cover from '$lib/assets/home_hero_cover.jpg'
</script>

<!-- Hero section -->
<div class="relative isolate overflow-hidden bg-hue1 h-[100vh]">
    <div class="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-40" aria-hidden="true">
        <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
             style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"/>
    </div>
    <div class="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div class="px-6 pb-12 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
            <div class="mx-auto max-w-2xl lg:mx-0">
                <div class="hidden sm:flex">
                    <div class="relative rounded-full px-3 py-1 text-sm leading-6 text-hue11 ring-1 ring-hue7 hover:ring-hue8">
                        {$_('home.hero.tagline')}
                        <a href="#" class="whitespace-nowrap font-semibold text-primary10">
                            <span class="absolute inset-0" aria-hidden="true"/>
                            {$_('home.hero.tagline_link')}
                            <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </div>
                <h1 class="mt-24 text-4xl font-bold tracking-tight text-hue12 sm:mt-10 sm:text-6xl">
                    <span class="bg-clip-text text-transparent rainbow">
                        {$_('home.hero.title')}
                    </span>
                </h1>
                <p class="mt-6 text-lg leading-8 text-hue11">
                    {$_('home.hero.text')}
                </p>
                <div class="mt-10 flex items-center gap-x-6">
                    <a href="#" class="btn-primary btn-xl">
                        {$_('home.hero.primary_action')}
                    </a>
                    <a href="#" class="text-sm font-semibold leading-6 text-hue12">
                        {$_('home.hero.secondary_action')}
                        <span aria-hidden="true">→</span>
                    </a>
                </div>
            </div>
        </div>
        <div class="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
            <img class="aspect-[3/2] w-full bg-hue1 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
                 src={cover} alt="Group of SXYA Members"/>
        </div>
    </div>
</div>

<style>
    .rainbow {
        background-image: linear-gradient(120deg, var(--vg-rainbow-1) 30%, var(--vg-rainbow-2));
        animation: rainbow 20s linear infinite;
    }

    @media (prefers-reduced-motion: reduce) {
        .rainbow {
            animation: none !important;
        }
    }

    @keyframes rainbow {
        0% {
            --vg-rainbow-1: #00a98e;
            --vg-rainbow-2: #009ff7;
        }
        1.25% {
            --vg-rainbow-1: #00a996;
            --vg-rainbow-2: #009dfa;
        }
        2.5% {
            --vg-rainbow-1: #00a99f;
            --vg-rainbow-2: #009bfc;
        }
        3.75% {
            --vg-rainbow-1: #00a9a7;
            --vg-rainbow-2: #0098fd;
        }
        5% {
            --vg-rainbow-1: #00a9b0;
            --vg-rainbow-2: #0096fd;
        }
        6.25% {
            --vg-rainbow-1: #00a9b8;
            --vg-rainbow-2: #0093fd;
        }
        7.5% {
            --vg-rainbow-1: #00a9c0;
            --vg-rainbow-2: #2e90fc;
        }
        8.75% {
            --vg-rainbow-1: #00a8c7;
            --vg-rainbow-2: #4d8dfa;
        }
        10% {
            --vg-rainbow-1: #00a8cf;
            --vg-rainbow-2: #638af8;
        }
        11.25% {
            --vg-rainbow-1: #00a7d5;
            --vg-rainbow-2: #7587f5;
        }
        12.5% {
            --vg-rainbow-1: #00a6dc;
            --vg-rainbow-2: #8583f1;
        }
        13.75% {
            --vg-rainbow-1: #00a6e2;
            --vg-rainbow-2: #9280ed;
        }
        15% {
            --vg-rainbow-1: #00a4e7;
            --vg-rainbow-2: #9f7ce9;
        }
        16.25% {
            --vg-rainbow-1: #00a3ec;
            --vg-rainbow-2: #aa78e3;
        }
        17.5% {
            --vg-rainbow-1: #00a2f1;
            --vg-rainbow-2: #b574dd;
        }
        18.75% {
            --vg-rainbow-1: #00a0f4;
            --vg-rainbow-2: #be71d7;
        }
        20% {
            --vg-rainbow-1: #009ff7;
            --vg-rainbow-2: #c76dd1;
        }
        21.25% {
            --vg-rainbow-1: #009dfa;
            --vg-rainbow-2: #cf69c9;
        }
        22.5% {
            --vg-rainbow-1: #009bfc;
            --vg-rainbow-2: #d566c2;
        }
        23.75% {
            --vg-rainbow-1: #0098fd;
            --vg-rainbow-2: #dc63ba;
        }
        25% {
            --vg-rainbow-1: #0096fd;
            --vg-rainbow-2: #e160b3;
        }
        26.25% {
            --vg-rainbow-1: #0093fd;
            --vg-rainbow-2: #e65eab;
        }
        27.5% {
            --vg-rainbow-1: #2e90fc;
            --vg-rainbow-2: #e95ca2;
        }
        28.75% {
            --vg-rainbow-1: #4d8dfa;
            --vg-rainbow-2: #ed5a9a;
        }
        30% {
            --vg-rainbow-1: #638af8;
            --vg-rainbow-2: #ef5992;
        }
        31.25% {
            --vg-rainbow-1: #7587f5;
            --vg-rainbow-2: #f15989;
        }
        32.5% {
            --vg-rainbow-1: #8583f1;
            --vg-rainbow-2: #f25981;
        }
        33.75% {
            --vg-rainbow-1: #9280ed;
            --vg-rainbow-2: #f25a79;
        }
        35% {
            --vg-rainbow-1: #9f7ce9;
            --vg-rainbow-2: #f25c71;
        }
        36.25% {
            --vg-rainbow-1: #aa78e3;
            --vg-rainbow-2: #f15e69;
        }
        37.5% {
            --vg-rainbow-1: #b574dd;
            --vg-rainbow-2: #ef6061;
        }
        38.75% {
            --vg-rainbow-1: #be71d7;
            --vg-rainbow-2: #ed635a;
        }
        40% {
            --vg-rainbow-1: #c76dd1;
            --vg-rainbow-2: #eb6552;
        }
        41.25% {
            --vg-rainbow-1: #cf69c9;
            --vg-rainbow-2: #e8694b;
        }
        42.5% {
            --vg-rainbow-1: #d566c2;
            --vg-rainbow-2: #e46c44;
        }
        43.75% {
            --vg-rainbow-1: #dc63ba;
            --vg-rainbow-2: #e06f3d;
        }
        45% {
            --vg-rainbow-1: #e160b3;
            --vg-rainbow-2: #db7336;
        }
        46.25% {
            --vg-rainbow-1: #e65eab;
            --vg-rainbow-2: #d77630;
        }
        47.5% {
            --vg-rainbow-1: #e95ca2;
            --vg-rainbow-2: #d17a2a;
        }
        48.75% {
            --vg-rainbow-1: #ed5a9a;
            --vg-rainbow-2: #cc7d24;
        }
        50% {
            --vg-rainbow-1: #ef5992;
            --vg-rainbow-2: #c6811e;
        }
        51.25% {
            --vg-rainbow-1: #f15989;
            --vg-rainbow-2: #bf8418;
        }
        52.5% {
            --vg-rainbow-1: #f25981;
            --vg-rainbow-2: #b98713;
        }
        53.75% {
            --vg-rainbow-1: #f25a79;
            --vg-rainbow-2: #b28a0f;
        }
        55% {
            --vg-rainbow-1: #f25c71;
            --vg-rainbow-2: #ab8d0c;
        }
        56.25% {
            --vg-rainbow-1: #f15e69;
            --vg-rainbow-2: #a3900b;
        }
        57.5% {
            --vg-rainbow-1: #ef6061;
            --vg-rainbow-2: #9c920d;
        }
        58.75% {
            --vg-rainbow-1: #ed635a;
            --vg-rainbow-2: #949510;
        }
        60% {
            --vg-rainbow-1: #eb6552;
            --vg-rainbow-2: #8b9715;
        }
        61.25% {
            --vg-rainbow-1: #e8694b;
            --vg-rainbow-2: #83991b;
        }
        62.5% {
            --vg-rainbow-1: #e46c44;
            --vg-rainbow-2: #7a9b21;
        }
        63.75% {
            --vg-rainbow-1: #e06f3d;
            --vg-rainbow-2: #719d27;
        }
        65% {
            --vg-rainbow-1: #db7336;
            --vg-rainbow-2: #679e2e;
        }
        66.25% {
            --vg-rainbow-1: #d77630;
            --vg-rainbow-2: #5da035;
        }
        67.5% {
            --vg-rainbow-1: #d17a2a;
            --vg-rainbow-2: #51a13c;
        }
        68.75% {
            --vg-rainbow-1: #cc7d24;
            --vg-rainbow-2: #44a244;
        }
        70% {
            --vg-rainbow-1: #c6811e;
            --vg-rainbow-2: #34a44b;
        }
        71.25% {
            --vg-rainbow-1: #bf8418;
            --vg-rainbow-2: #1ba553;
        }
        72.5% {
            --vg-rainbow-1: #b98713;
            --vg-rainbow-2: #00a65b;
        }
        73.75% {
            --vg-rainbow-1: #b28a0f;
            --vg-rainbow-2: #00a663;
        }
        75% {
            --vg-rainbow-1: #ab8d0c;
            --vg-rainbow-2: #00a76c;
        }
        76.25% {
            --vg-rainbow-1: #a3900b;
            --vg-rainbow-2: #00a874;
        }
        77.5% {
            --vg-rainbow-1: #9c920d;
            --vg-rainbow-2: #00a87d;
        }
        78.75% {
            --vg-rainbow-1: #949510;
            --vg-rainbow-2: #00a985;
        }
        80% {
            --vg-rainbow-1: #8b9715;
            --vg-rainbow-2: #00a98e;
        }
        81.25% {
            --vg-rainbow-1: #83991b;
            --vg-rainbow-2: #00a996;
        }
        82.5% {
            --vg-rainbow-1: #7a9b21;
            --vg-rainbow-2: #00a99f;
        }
        83.75% {
            --vg-rainbow-1: #719d27;
            --vg-rainbow-2: #00a9a7;
        }
        85% {
            --vg-rainbow-1: #679e2e;
            --vg-rainbow-2: #00a9b0;
        }
        86.25% {
            --vg-rainbow-1: #5da035;
            --vg-rainbow-2: #00a9b8;
        }
        87.5% {
            --vg-rainbow-1: #51a13c;
            --vg-rainbow-2: #00a9c0;
        }
        88.75% {
            --vg-rainbow-1: #44a244;
            --vg-rainbow-2: #00a8c7;
        }
        90% {
            --vg-rainbow-1: #34a44b;
            --vg-rainbow-2: #00a8cf;
        }
        91.25% {
            --vg-rainbow-1: #1ba553;
            --vg-rainbow-2: #00a7d5;
        }
        92.5% {
            --vg-rainbow-1: #00a65b;
            --vg-rainbow-2: #00a6dc;
        }
        93.75% {
            --vg-rainbow-1: #00a663;
            --vg-rainbow-2: #00a6e2;
        }
        95% {
            --vg-rainbow-1: #00a76c;
            --vg-rainbow-2: #00a4e7;
        }
        96.25% {
            --vg-rainbow-1: #00a874;
            --vg-rainbow-2: #00a3ec;
        }
        97.5% {
            --vg-rainbow-1: #00a87d;
            --vg-rainbow-2: #00a2f1;
        }
        98.75% {
            --vg-rainbow-1: #00a985;
            --vg-rainbow-2: #00a0f4;
        }
        100% {
            --vg-rainbow-1: #00a98e;
            --vg-rainbow-2: #009ff7;
        }
    }
</style>
