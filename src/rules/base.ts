export interface BaseRules {}

export interface Result {
    passed: boolean;
    error?: string;
}

export type Validator<T, K> = (value: T, extra: K) => Result;
