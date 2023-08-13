<script>


  import {_} from "svelte-i18n";

  const posts = [
    {
      id: 1,
      title: 'Boost your conversion rate',
      href: '#',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      imageUrl:
        'https://placehold.co/600x400',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
      category: {title: 'Marketing', href: '#'},
    },
    // More posts...
  ];
</script>

<!-- Blog section -->
<div class="py-24">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {$_('home.blog.title')}
            </h2>
            <p class="mt-2 text-lg leading-8 text-gray-600">
                {$_('home.blog.text')}
            </p>
        </div>
        <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {#each posts as post (post.id)}
                <article class="flex flex-col items-start justify-between">
                    <div class="relative w-full">
                        <img src={post.imageUrl} alt=""
                             class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"/>
                        <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"/>
                    </div>
                    <div class="max-w-xl">
                        <div class="mt-8 flex items-center gap-x-4 text-xs">
                            <time datetime={post.datetime} class="text-gray-500">{post.date}</time>
                            <a href={post.category.href}
                               class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                                {post.category.title}
                            </a>
                        </div>
                        <div class="group relative">
                            <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                <a href={post.href}>
                                    <span class="absolute inset-0"/>
                                    {post.title}
                                </a>
                            </h3>
                            <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                        </div>
                    </div>
                </article>
            {/each}
        </div>
    </div>
</div>
