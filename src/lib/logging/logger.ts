import { Roarr } from 'roarr';
import type { JsonObject } from 'roarr/dist/types';

export const SuperLogger = Roarr.child({});

export const getLogger = (...namespaces: string[]) => {
	return SuperLogger.child({
		namespace: namespaces.join(':')
	});
};

export const normalizeForLog = (obj: any): JsonObject => {
	return obj;
};
