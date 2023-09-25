<script lang="ts">
  import { page } from '$app/stores';

  $: console.log($page.error)
</script>

<h1 class="mt-20">{$page.error.message}</h1>
