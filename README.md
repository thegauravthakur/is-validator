# is-validator
A runtime validator and a schema generator with the final schema as a JSON object which could be easily shared and stored

## Guide
### Generate a Schema

```javascript
const PersonSchema = {
    name: is.string({ minLength: 2, maxLength: 10 }),
    email: is.string({ isEmail: true, minLength: 5 }),
    age: is.number({ moreThan: 18 }),
};
```
This will return a JSON configuration of below shape
```JSON
{
    "name": {
        "type": "string",
        "rules": {
            "minLength": 2,
            "maxLength": 10
        }
    },
    "email": {
        "type": "string",
        "rules": {
            "isEmail": true,
            "minLength": 5
        }
    },
    "age": {
        "type": "number",
        "rules": {
            "moreThan": 18
        }
    }
}
```
Now, we can share this schema with backend (with the help of NPM module) or store it in a DB.
We can also infer the type from the schema with the help of exported type `InferType`
```typescript
type Person = InferType<typeof PersonSchema>;

const person: Person = {
    name: 'Gaurav Thakur',
    email: 'gthakur581@gmail.com',
    age: 21,
};
```
![Screenshot 2022-10-31 at 1 11 33 PM](https://user-images.githubusercontent.com/25100451/198956681-8ced79fc-e517-4ae9-b99b-f11d5e3d8be5.png)

We can also validate schema against the data in runtime
```typescript
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

const result = validateSchema(PersonSchema, person);
console.log(result);
```
output:

![image](https://user-images.githubusercontent.com/25100451/198957755-ff43533a-43b7-406b-afd5-6d23e86ff461.png)

Instead of silently returning the error, we could also throw an error by enabling `shouldThrowError` property
```TypeScript
const result = validateSchema(PersonSchema, person, { shouldThrowError: true });
```

### Inbuild Rules:
1. is.string()
    - minLength
    - maxLength
    - isEmail
    - endsWith
    - startsWith

2. is.number()
    - isPositive
    - isNegative
    - lessThan
    - moreThan
    
### Todo
- [ ] Add support for more data type e.g. boolean, enums etc
- [ ] Add support for more rules
- [ ] Add support for initializing the schema object when received schema from another source 

