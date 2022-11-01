import { Result, BaseRules, Validator } from './base';
import { emailRegex, urlRegex } from '../constants/regex';

export interface StringRules extends BaseRules {
    minLength: number;
    maxLength: number;
    isEmail: boolean;
    isURL: boolean;
    endsWith: string;
    statsWith: string;
    regex: RegExp;
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
            result.error = value + ' is not a valid email';
        }
        return result;
    },
    regex(value: string, regex: RegExp): Result {
        const result: Result = { passed: true };
        if (!regex.test(value)) {
            result.passed = false;
            result.error = "Regex doesn't pass";
        }
        return result;
    },
    isURL(value: string): Result {
        const result: Result = { passed: true };
        if (!urlRegex.test(value)) {
            result.passed = false;
            result.error = value + ' is not a valid URL';
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
