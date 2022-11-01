import { BaseRules, Result, Validator } from './base';

export interface BooleanRules extends BaseRules {
    isFalsy: boolean;
    isTruly: boolean;
}

export const booleanRules: Record<
    keyof BooleanRules,
    Validator<boolean, any>
> = {
    isFalsy(value: boolean): Result {
        const result: Result = { passed: true };
        if (value) {
            result.passed = false;
            result.error = 'value is not falsy';
        }
        return result;
    },
    isTruly(value: boolean): Result {
        const result: Result = { passed: true };
        if (!value) {
            result.passed = false;
            result.error = 'value is not truly';
        }
        return result;
    },
};
