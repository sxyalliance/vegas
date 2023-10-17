<script lang="ts">
	import { setLanguageTag } from '@inlang/paraglide-js/vegas';
	import * as m from '@inlang/paraglide-js/vegas/messages';
</script>

<button on:click={() => setLanguageTag('de')}> change the language to "de" </button>
<button on:click={() => setLanguageTag('en')}>change the language to "en" </button>
<button on:click={() => setLanguageTag('zh-HK')}>change the language to "zh-HK" </button>

<h1>{m.hello()}</h1>
<p>{@html m.docs()}</p>
