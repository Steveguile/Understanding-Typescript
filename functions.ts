function add(a: number, b: number): number {
	return a + b;
}

// never is ts. It will never return void because it will never finish
function logAndThrow(message: string): never {
	console.log(message);
	throw new Error(message)
}

// functions are values in js. Function type is provided by ts
function performJob(cb: Function) {
	// ...
	cb();
}

// Function isn't very specific, usually you'll specify the function type itself
function performJob2(cb: (parameter1: string) => never ) {
	// ...
	cb("hello");
}

performJob(logAndThrow);

type User = {
	name: string;
	age: number;
	greet: () => string;
};

let user: User = {
	name: 'Max',
	age:39,
	greet() {
		console.log('Hello there!');
		return this.name;
	}
}