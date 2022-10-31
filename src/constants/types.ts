export enum Types {
    string = 'string',
    number = 'number',
    boolean = 'boolean',
}

export type TypeMapping<T> = T extends 'string'
    ? string
    : T extends 'number'
    ? number
    : T extends 'boolean'
    ? boolean
    : unknown;
