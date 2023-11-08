// Squelch warnings of image imports from your assets dir
declare module '$lib/assets/*' {
	let meta;
	export default meta;
}

declare module '$env/static/public' {
	export const PUBLIC_SUPABASE_ANON_KEY: string;
	export const PUBLIC_SUPABASE_URL: string;
}

declare module '$env/static/private' {
	export const CLOUDFLARE_ACCOUNT: string;
	export const CLOUDFLARE_AI_TOKEN_VALUE: string;
}
