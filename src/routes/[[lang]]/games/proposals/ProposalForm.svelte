<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getForm } from 'formsnap';

	import { superForm } from 'sveltekit-superforms/client';

	import { trpc } from '$lib/trpc/client';
	import { Button } from '$lib/vgui/components/ui/button';
	import * as Form from '$lib/vgui/components/ui/form';
	import { Input } from '$lib/vgui/components/ui/input';
	import { Separator } from '$lib/vgui/components/ui/separator';

	import { formSchema, type FormSchema } from './schema';

	import type { SuperValidated } from 'sveltekit-superforms';

	export let form: SuperValidated<FormSchema>;

	const superFrm = superForm(form, {
		validators: formSchema,
		taintedMessage: null
	});

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
			superFrm.form.update((current) => {
				return {
					...current,
					name: data.name,
					provider: data.provider,
					provider_identifier: data.provider_identifier,
					image_url: data.image_url,
					description: data.description
				};
			});
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

<Form.Root method="POST" form={superFrm} schema={formSchema} let:config controlled>
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
