import { BaseRules, Result, Validator } from './base';

export interface NumberRules extends BaseRules {
    isPositive: boolean;
    isNegative: boolean;
    lessThan: number;
    moreThan: number;
}

export const numberRules: Record<keyof NumberRules, Validator<number, any>> = {
    isPositive(value: number): Result {
        const result: Result = { passed: true };
        if (value < 0) {
            result.passed = false;
            result.error = value + ' is not positive';
        }
        return result;
    },
    isNegative(value: number): Result {
        const result: Result = { passed: true };
        if (value >= 0) {
            result.passed = false;
            result.error = value + ' is not negative';
        }
        return result;
    },
    lessThan(value: number, key: number): Result {
        const result: Result = { passed: true };
        if (value >= key) {
            result.passed = false;
            result.error = value + ' is not less than ' + key;
        }
        return result;
    },
    moreThan(value: number, key: number): Result {
        const result: Result = { passed: true };
        if (value <= key) {
            result.passed = false;
            result.error = value + ' is not more than ' + key;
        }
        return result;
    },
};
