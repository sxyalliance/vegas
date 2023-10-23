export interface CloudflareApiResponse<T> {
	result: T;
	success: boolean;
	errors: string[];
	messages: string[];
}

export interface CloudflareAiResult {
	response: string;
}
