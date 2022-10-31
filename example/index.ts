import { is, validateSchema } from 'is-validator';
import type { InferType } from 'is-validator';

const PersonSchema = {
    name: is.string({ minLength: 2, maxLength: 10 }),
    email: is.string({ isEmail: true, minLength: 5 }),
    age: is.number({ moreThan: 18 }),
};

type Person = InferType<typeof PersonSchema>;

const person: Person = {
    name: 'A',
    email: 'gthakur581@gmail.com',
    age: 10,
};

const result = validateSchema(PersonSchema, person, { shouldThrowError: true });
console.log(result);
