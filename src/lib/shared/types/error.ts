import { Result } from 'neverthrow';

export type ErrorResult = { code: number; message: string; previous?: ErrorResult };

export type StandardResult<T> = Result<T, ErrorResult>;
