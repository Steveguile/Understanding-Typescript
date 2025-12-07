// This does not exist at runtime, it's a TypeScript only construct
// We can see this uses a type rather than a value (compare to TypeScript's typeof)
type User = { name: string; age: number };
type UserKeys = keyof User; // "name" | "age"

let validKey: UserKeys;
validKey = "name"; // OK
validKey = "age";  // OK
// validKey = "email"; // Error: Type '"email"' is not assignable to type 'UserKeys'.

// More realistic example
// We could do this directely 
function getProp(obj: User, key: UserKeys) {
	const val = obj[key];
	if (val === undefined || val === null) {
		throw new Error(`Property ${key} is missing or null`);
	}
	return val;
}

// Or we could do this using generics
function getProp2<T extends object, U extends keyof T>(obj: T, key: U) {
	const val = obj[key];
	if (val === undefined || val === null) {
		throw new Error(`Property is missing or null`);
	}
	return val;
}


const data = { name: "Alice", age: 30, email: "alice@example.com" };
const user = { name: "Bob", age: 25 };

console.log(getProp(data, "name")); // "Alice"
console.log(getProp2(user, "name")); // 25
// console.log(getProp(user, "email")); // Error at compile time
console.log(getProp2(data, "email")); // alice@example.com