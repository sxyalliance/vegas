<script lang="ts">
	import * as m from '$lib/shared/i18n/compiled/messages';

	import { Alert, AlertDescription } from '$lib/vgui/components/ui/alert';
</script>

<Alert variant="destructive">
	<AlertDescription>{m.common_data_unavailable()}</AlertDescription>
</Alert>
