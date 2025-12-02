// Interfaces get compiled away in the JavaScript output
interface Authenticatable {
	email: string;
	password: string;

	login(): void;
	logout(): void;
}

// If you want to define an object shape you can also declare it like this:
// type Autheticatable = {...}
let employee: Authenticatable;
employee = {
	email: 'email@example.com',
	password: 'test1',
	login() {
		console.log('User logged in');
	},
	logout() {
		console.log('User logged out');
	},
	role: 'user'
}

// Declaration merging requires interfaces - see above errors as the interfaces are merged
// This is mostly useful to extend a library's interfaces
interface Authenticatable {
	role: string;
}

class AuthenticatableUser implements Authenticatable {
	email: string;
	password: string;
	role: string;

	constructor(email: string, password: string, role: string) {
		this.email = email;
		this.password = password;
		this.role = role;
	}

	login(): void {
		console.log(`${this.email} logged in as ${this.role}`);
	}
	logout(): void {
		console.log(`${this.email} logged out`);
	}
}

// Say this function exists somewhere else in your code 
function authenticate(user: {login(): void}) {} // You could do this 
function authenticate2(user: Authenticatable) {} // Or this

// Inherit the interface
interface AuthenticatableAdmin extends Authenticatable {
	role: 'admin' | 'superadmin';
}