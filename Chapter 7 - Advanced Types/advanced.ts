// Index type example
type DataStore = {
	// Placeholder for any number of properties with string keys
	[prop: string]: string | number | boolean;
}

let someObj: Record<string, string | number | boolean>; // Same as above

let store: DataStore = {};

// As many properties as you want that contain string, number, or boolean values
store.id = 123;
store.name = "My Data Store";
// ...
store.object = {}; // Error: Type '{}' is not assignable to type 'string | number | boolean'

let roles = ['admin', 'guest', 'editor']; // Assumes string array
// Essentialy becomes 'admin' | 'guest' | 'editor'
let roles2 = ['admin', 'guest', 'editor'] as const; // Assumes tuple of string literals. Be as narrow as possible
const firstRole = roles2[0];
roles2 = 'steve'; // Error: Type 'string' is not assignable to type '"admin" | "guest" | "editor"'


const dataEntries: Record<string, number> = {
	entry1: 0.51,
	entry2: -1.2
}

dataEntries.entry1 = 3.14;
dataEntries.entry3 = 42;

// This is a concrete object
const dataEntries2 = {
	entry1: 0.51,
	entry2: -1.2
} satisfies Record<string, number>; // Checks if internal properties match the Record type

dataEntries2.entry1 = 3.14;
dataEntries2.entry3 = 42; // See you can't add new properties