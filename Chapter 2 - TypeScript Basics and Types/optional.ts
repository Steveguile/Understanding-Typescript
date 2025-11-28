function generateError(msg?: string) {
	throw new Error(msg);
}

generateError();

type Person = {
	name: string;
	age: number;
	job?: 'developer' | 'designer' | 'manager'; // job is optional
};

// Nullish coalescing operator (??) - returns the right side if the left side is null or undefined. This is standard JS now.
let input = null;
const didProvideInput = input || false; // returns false because input is null
const didProvideInput2 = input ?? false; // returns false because input is null

// JS has a concept of truthy and falsy values. Falsy values are values that are considered false in a boolean context. These are: false, 0, '', null, undefined, NaN
let input2 = ''; // Falsy value
const didProvideInput3 = input2 || false; // returns false because both left and right are falsy
const didProvideInput4 = input2 ?? false; // returns '' because input2 is not null or undefined