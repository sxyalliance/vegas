<script lang="ts">
	import { setLanguageTag } from '@inlang/paraglide-js/vegas';
	import * as m from '@inlang/paraglide-js/vegas/messages';
</script>

<button on:click={() => setLanguageTag('en-US')}>change the language to "en"</button>
<button on:click={() => setLanguageTag('zh-HK')}>change the language to "zh-HK"</button>

<h1>{m.brand_name()}</h1>
