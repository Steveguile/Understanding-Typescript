
let users : (string | number)[];
let userSame : Array<string | number>;

// tuple limits array to fixed length
let possibleResults: [number, string];
possibleResults = [1, '2'];
possibleResults = [1, '2', 3];

// Object
let user: {
	name: string;
	age: number | string;
	hobbies?: string[];
	role?: {
		description: string;
		id: number
	}
} = {
	name: 'Steve',
	age: 28
};

// must not be null or undefined type (not empty object)
let val: {} = 'some text';
const someObj = {}; // This is an empty object
let val2: {} = null;
let val3: {} = undefined;

// Record type is generic type for key:value pairs.
// Good Generic type definition - requires other types to work
let data: Record<string, number | string>;