<script lang="ts">
  import type { PostProperties } from "../types";
  import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

  export let properties: PostProperties;
</script>

<article class="mb-16">
  <a data-sveltekit-preload-data href={`/blog/${properties.slug}`} class="flex flex-col">
    <!--    <Image-->
    <!--      src={ cover?.external?.url ?? "https://picsum.photos/id/300/500?blur=9&random=2" }-->
    <!--      layout="fullWidth"-->
    <!--      alt="A lovely bath"-->
    <!--      class="rounded-md object-cover aspect-video"-->
    <!--    />-->

    <div>
      <h1 class="font-bold text-2xl text-gray-800 mt-4">{properties.title}</h1>
      <p class="line-clamp-2 text-gray-700">{properties.description}</p>
    </div>
  </a>
</article>
