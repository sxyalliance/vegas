// Squelch warnings of image imports from your assets dir
declare module '$lib/assets/*' {
	let meta;
	export default meta;
}

// Markdown
declare module '*.md' {
	// "unknown" would be more detailed depends on how you structure frontmatter
	const attributes: Record<string, unknown>;

	// When "Mode.TOC" is requested
	const toc: { level: string; content: string }[];

	// When "Mode.HTML" is requested
	const html: string;

	// Modify below per your usage
	export { attributes, toc, html };
}

declare module '$env/static/public' {
	export const PUBLIC_SUPABASE_ANON_KEY: string;
	export const PUBLIC_SUPABASE_URL: string;
}

declare module '$env/static/private' {
	export const CLOUDFLARE_ACCOUNT: string;
	export const CLOUDFLARE_AI_TOKEN_VALUE: string;
}
