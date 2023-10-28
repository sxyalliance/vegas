export const valueOrNothing = <T>(value: unknown): T | undefined => {
	if (value) {
		return value as T;
	}
	return undefined;
};
