<script lang="ts">
	import Icon from '@iconify/svelte';

	import SeoHandler from '$lib/shared/seo/SeoHandler.svelte';
	import ComingSoonOverlay from '$lib/shared/shared/components/ComingSoonOverlay.svelte';
	import * as Form from '$lib/vgui/components/ui/form';

	import { formSchema } from './schema';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<SeoHandler
	metaTags={{
		title: 'Contact Us'
	}}
/>

<div class="h-hero relative isolate">
	<div class="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
		<div class="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
			<div class="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
				<!-- Decorative Grid -->
				<div
					class="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden border-r border-border bg-muted/30 lg:w-1/2"
				>
					<svg
						class="absolute inset-0 h-full w-full stroke-border [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
						aria-hidden="true"
					>
						<defs>
							<pattern
								id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
								width="200"
								height="200"
								x="100%"
								y="-1"
								patternUnits="userSpaceOnUse"
							>
								<path d="M130 200V.5M.5 .5H200" fill="none" />
							</pattern>
						</defs>
						<rect width="100%" height="100%" stroke-width="0" fill="white" />
						<svg x="100%" y="-1" class="overflow-visible fill-muted/20">
							<path d="M-470.5 0h201v201h-201Z" stroke-width="0" />
						</svg>
						<rect
							width="100%"
							height="100%"
							stroke-width="0"
							fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
						/>
					</svg>
				</div>

				<h2 class="text-3xl font-bold tracking-tight">Get in touch</h2>
				<p class="mt-6 text-lg leading-8 text-muted-foreground">
					Do you wish to accompany us? or simply have a few inquiries for us? You can use any of the
					following forms and methods to get in touch with us, no matter what.
				</p>
				<dl class="mt-10 space-y-4 text-base text-muted-foreground">
					<div class="flex items-center gap-x-3">
						<dt class="flex-none">
							<span class="sr-only">Address</span>
							<Icon icon="lucide:building" class="h-5 w-5 text-muted-foreground/60" />
						</dt>
						<dd>TBA</dd>
					</div>
					<div class="flex items-center gap-x-3">
						<dt class="flex-none">
							<span class="sr-only">Telephone</span>
							<Icon icon="lucide:phone" class="h-5 w-5 text-muted-foreground/60" />
						</dt>
						<dd>TBA</dd>
					</div>
					<div class="flex items-center gap-x-3">
						<dt class="flex-none">
							<span class="sr-only">Email</span>
							<Icon icon="lucide:mail" class="-mb-px h-5 w-5 text-muted-foreground/60" />
						</dt>
						<dd>
							<a class="hover:text-foreground" href="mailto:contact@sxya.org">contact@sxya.org</a>
						</dd>
					</div>
					<div class="flex items-center gap-x-3">
						<dt class="flex-none">
							<span class="sr-only">Discord</span>
							<Icon icon="simple-icons:discord" class="h-5 w-5 text-muted-foreground/60" />
						</dt>
						<dd>Invite Only</dd>
					</div>
				</dl>
			</div>
		</div>

		<Form.Root
			method="POST"
			form={data.form}
			schema={formSchema}
			let:config
			class="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48"
		>
			<div class="relative mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
				<ComingSoonOverlay />

				<Form.Field {config} name="name">
					<Form.Item>
						<Form.Label>Name</Form.Label>
						<Form.Input />
						<Form.Validation />
					</Form.Item>
				</Form.Field>

				<Form.Field {config} name="email">
					<Form.Item>
						<Form.Label>Email</Form.Label>
						<Form.Input />
						<Form.Validation />
					</Form.Item>
				</Form.Field>

				<Form.Field {config} name="message">
					<Form.Item>
						<Form.Label>Message</Form.Label>
						<Form.Textarea rows={5} />
						<Form.Validation />
					</Form.Item>
				</Form.Field>

				<Form.Button>Leave a Message</Form.Button>
			</div>
		</Form.Root>
	</div>
</div>
