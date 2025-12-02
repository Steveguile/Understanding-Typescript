class User {

	name: string;
	age: number;

	constructor(n: string, a: number) {
		this.name = n;
		this.age = a;
	}
}

class User2 {
	constructor(public name: string, public age: number) {}
}

new User('Steve', 20);
new User2('Steve', 20);




class Other {
	readonly five: number = 5; // property may be read and accessed but not changed
	public readonly name: string = 'Steve'; // Can use access modifiers
}
