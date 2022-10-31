import { numberRules, stringRules, StringRules } from './rules';
import { NumberRules } from './rules/number';
import { TypeMapping, Types } from './constants/types';

type Schema = Record<string, Validator<Types>>;

interface Validator<T> {
    type: T;
    rules: Partial<StringRules> | Partial<NumberRules>;
}

export const is = {
    string(rules: Partial<StringRules> = {}): Validator<Types.string> {
        return { type: Types.string, rules } as const;
    },
    number(rules: Partial<NumberRules> = {}): Validator<Types.number> {
        return { type: Types.number, rules } as const;
    },
};

export type InferType<schema extends Record<string, Validator<Types>>> = {
    [k in keyof schema]: TypeMapping<schema[k]['type']>;
};

interface ValidateSchemaOptions {
    shouldThrowError: boolean;
}
export function validateSchema(
    schema: Schema,
    values: InferType<typeof schema>,
    options?: ValidateSchemaOptions
) {
    const finalResult: Record<string, string[]> = {};
    for (const key in schema) {
        if (schema[key].type === Types.string) {
            const rules = schema[key].rules as StringRules;
            for (const rule in rules) {
                const result = stringRules[rule as keyof StringRules](
                    values[key] as string,
                    rules[rule as keyof StringRules]
                );
                if (!result.passed && !!result.error) {
                    if (!finalResult[key]) finalResult[key] = [];
                    finalResult[key].push(result.error);
                }
            }
        }
        if (schema[key].type === Types.number) {
            const rules = schema[key].rules as NumberRules;
            for (const rule in rules) {
                const result = numberRules[rule as keyof NumberRules](
                    values[key] as number,
                    rules[rule as keyof NumberRules]
                );
                if (!result.passed && !!result.error) {
                    if (!finalResult[key]) finalResult[key] = [];
                    finalResult[key].push(result.error);
                }
            }
        }
    }
    const hasError = Object.keys(finalResult).length > 0;
    if (hasError && options?.shouldThrowError) {
        throw finalResult;
    }
    return { hasError, errors: finalResult };
}
