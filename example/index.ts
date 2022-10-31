import { is, validateSchema } from 'is-validator';
import type { InferType } from 'is-validator';

const AppSchema = {
    name: is.string({ minLength: 2, maxLength: 10 }),
    email: is.string({ isEmail: true, minLength: 5 }),
    age: is.number({ moreThan: 18 }),
};

type AppProps = InferType<typeof AppSchema>;

const person: AppProps = {
    name: 'gav',
    email: 'sdf',
    age: 8,
};

const { hasError, errors } = validateSchema(AppSchema, person);
console.log(errors);
