<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getForm } from 'formsnap';

	import { trpc } from '$lib/trpc/client';
	import { Button } from '$lib/vgui/components/ui/button';
	import * as Form from '$lib/vgui/components/ui/form';
	import { Input } from '$lib/vgui/components/ui/input';
	import { Separator } from '$lib/vgui/components/ui/separator';

	import { formSchema, type FormSchema } from './schema';

	import type { SuperValidated } from 'sveltekit-superforms';

	export let form: SuperValidated<FormSchema>;

	let store_url = '';

	const resolve = trpc($page).resolve.createMutation();

	const autoFill = async () => {
		if (!store_url) {
			return;
		}

		$resolve.mutate(store_url);
	};

	$: {
		if ($resolve.isSuccess) {
			const { data } = $resolve;

			// convert to url query
			const query = new URLSearchParams();
			query.set('name', data.name);
			query.set('provider', data.provider);
			query.set('provider_identifier', data.provider_identifier);
			query.set('image_url', data.image_url);
			query.set('description', data.description);

			// update url
			location.hash = query.toString();
			location.reload();
		}
	}

	// decode url query
	if (browser) {
		const query = location.hash
			? new URLSearchParams(location.hash.slice(1))
			: new URLSearchParams();
		if (query.has('name')) {
			form.data.name = query.get('name') ?? '';
			form.data.provider = (query.get('provider') as 'steam' | 'xbox') ?? 'steam';
			form.data.provider_identifier = query.get('provider_identifier') ?? '';
			form.data.image_url = query.get('image_url') ?? '';
			form.data.description = query.get('description') ?? '';
		}
	}
</script>

<div class="flex w-full items-center space-x-2">
	<Input
		type="url"
		bind:value={store_url}
		placeholder="https://store.steampowered.com/app/1144200/Ready_or_Not/"
	/>
	<Button on:click={autoFill}>Auto-fill</Button>
</div>

<Separator class="my-8" />

<Form.Root method="POST" {form} schema={formSchema} let:config>
	<Form.Field {config} name="name">
		<Form.Item>
			<Form.Label>Game Name</Form.Label>
			<Form.Input />
			<Form.Validation />
		</Form.Item>
	</Form.Field>

	<Form.Field {config} name="provider">
		<Form.Item>
			<Form.Label>Provider (Store)</Form.Label>
			<Form.Select>
				<Form.SelectTrigger />
				<Form.SelectContent>
					<Form.SelectItem value="steam">Steam</Form.SelectItem>
					<Form.SelectItem value="xbox">Xbox</Form.SelectItem>
					<Form.SelectItem value="other">Other</Form.SelectItem>
				</Form.SelectContent>
			</Form.Select>
			<Form.Validation />
		</Form.Item>
	</Form.Field>

	<Form.Field {config} name="provider_identifier">
		<Form.Item>
			<Form.Label>Provider Identifier</Form.Label>
			<Form.Input />
			<Form.Validation />
		</Form.Item>
	</Form.Field>

	<Form.Field {config} name="image_url">
		<Form.Item>
			<Form.Label>Image URL</Form.Label>
			<Form.Input />
			<Form.Validation />
		</Form.Item>
	</Form.Field>

	<Form.Field {config} name="description">
		<Form.Item>
			<Form.Label>Description</Form.Label>
			<Form.Textarea />
			<Form.Validation />
		</Form.Item>
	</Form.Field>

	<Form.Button>Submit</Form.Button>
</Form.Root>
