import { Result, BaseRules, Validator } from './base';
import { emailRegex } from '../constants/regex';

export interface StringRules extends BaseRules {
    minLength: number;
    maxLength: number;
    isEmail: boolean;
    endsWith: string;
    statsWith: string;
}

export const stringRules: Record<keyof StringRules, Validator<string, any>> = {
    minLength(value: string, length: number): Result {
        const result: Result = { passed: true };
        if (value.length < length) {
            result.passed = false;
            result.error = 'length should be greater than ' + length;
        }
        return result;
    },
    maxLength(value: string, length: number): Result {
        const result: Result = { passed: true };
        if (value.length > length) {
            result.passed = false;
            result.error = 'length should be less than' + length;
        }
        return result;
    },
    isEmail(value: string): Result {
        const result: Result = { passed: true };
        if (!emailRegex.test(value)) {
            result.passed = false;
            result.error = 'email is not valid';
        }
        return result;
    },
    statsWith(value: string, key: string): Result {
        const result: Result = { passed: true };
        if (!value.startsWith(key)) {
            result.passed = false;
            result.error = value + " doesn't starts with " + key;
        }
        return result;
    },
    endsWith(value: string, key: string): Result {
        const result: Result = { passed: true };
        if (!value.endsWith(key)) {
            result.passed = false;
            result.error = value + " doesn't ends with " + key;
        }
        return result;
    },
};
