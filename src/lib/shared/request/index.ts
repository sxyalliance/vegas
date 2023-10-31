import wretch from 'wretch';
import QueryStringAddon from 'wretch/addons/queryString';
import { err, ok } from 'neverthrow';
import type { ErrorResult, StandardResult } from '$lib/shared/shared/result';

const setupRequester = (customFetch: typeof window.fetch) => {
	return wretch()
		.polyfills({
			fetch: customFetch
		})
		.addon(QueryStringAddon)
		.errorType('json')
		.resolve((r) => r.json());
};

export const baseRequester = setupRequester(fetch);

export type RequesterErrorTransformer = (e: unknown) => ErrorResult | false;

export class Requester {
	private requester: ReturnType<typeof setupRequester>;

	constructor(
		public baseUrl: string,
		customFetch: typeof window.fetch = fetch,
		token?: string,
		private errorTransformer?: RequesterErrorTransformer
	) {
		this.requester = setupRequester(customFetch).url(baseUrl);
		if (token) {
			this.requester = this.requester.auth(`Bearer ${token}`);
		}
	}

	async get<T>(url: string, params?: string | object): Promise<StandardResult<T>> {
		let r = this.requester.url(url);
		if (params) {
			r = r.query(params);
		}

		try {
			const result = (await r.get()) as T;
			return ok(result);
		} catch (e) {
			return err(this.transformError(e));
		}
	}

	async post<T>(url: string, body?: object): Promise<StandardResult<T>> {
		let r = this.requester.url(url);
		if (body) {
			r = r.json(body);
		}

		try {
			const result = (await r.post()) as T;
			return ok(result);
		} catch (e) {
			return err(this.transformError(e));
		}
	}

	async put<T>(url: string, body?: object): Promise<StandardResult<T>> {
		let r = this.requester.url(url);
		if (body) {
			r = r.json(body);
		}

		try {
			const result = (await r.put()) as T;
			return ok(result);
		} catch (e) {
			return err(this.transformError(e));
		}
	}

	async delete<T>(url: string, body?: object): Promise<StandardResult<T>> {
		let r = this.requester.url(url);
		if (body) {
			r = r.json(body);
		}

		try {
			const result = (await r.delete()) as T;
			return ok(result);
		} catch (e) {
			return err(this.transformError(e));
		}
	}

	async patch<T>(url: string, body?: object): Promise<StandardResult<T>> {
		let r = this.requester.url(url);
		if (body) {
			r = r.json(body);
		}

		try {
			const result = (await r.patch()) as T;
			return ok(result);
		} catch (e) {
			return err(this.transformError(e));
		}
	}

	private transformError = (e: unknown): ErrorResult => {
		if (this.errorTransformer) {
			const result = this.errorTransformer(e);
			if (result) return result;
		}

		if (e instanceof wretch.WretchError) {
			const message =
				typeof e.message === 'object' && Object.keys(e.message).length > 0
					? JSON.stringify(e.message)
					: e.response.statusText;

			return { code: e.response.status, message };
		}

		return { code: 500, message: 'Unknown error occurred during request' };
	};
}

export const createRequester = (
	baseUrl: string,
	customFetch: typeof window.fetch = fetch,
	token?: string,
	errorTransformer?: RequesterErrorTransformer
): Requester => {
	return new Requester(baseUrl, customFetch, token, errorTransformer);
};
