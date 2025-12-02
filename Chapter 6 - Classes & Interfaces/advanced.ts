class User {
	constructor(private firstName: string, private lastName: string) {}

	get fullName(): string {
		return `${this.firstName} ${this.lastName}`;
	}

	// Invalid getter method (should not have a return type of void)
	// get test(): void {

	// }
}

const user = new User("John", "Doe");
console.log(user.fullName); // Output: John Doe

class User2 {
	protected _firstName: string = '';
	private _lastName: string = '';

	// Must have exactly one parameter
	set firstName(name: string) {
		if (name.trim() === '') {
			throw new Error('First name cannot be empty');
		}
		this._firstName = name;
	}

	set lastName(name: string) {
		if (name.trim() === '') {
			throw new Error('Last name cannot be empty');
		}
		this._lastName = name;
	}

	get firstName(): string {
		return this._firstName;
	}

	get lastName(): string {
		return this._lastName;
	}

	static eid = 'USER';
	
}

console.log(User2.eid); // Output: USER

class Employee extends User2 {
	constructor(public jobTitle: string, firstName: string, lastName: string) {
		super();
		this._firstName = firstName; // Accessing protected member
		this.lastName = lastName;
	}

	public work() {

	}
}

// Abstract is ts specific
abstract class UIElement {
	constructor(public identifier: string) {}

	// logic to duplicate the UI element
	public clone(targetLocation: string): void  {}
}

// let uiElement = new UIElement('button1'); // Error: Cannot create an instance of an abstract class
class SideDrawElement extends UIElement {
	constructor(identifier: string, public position: 'left' | 'right') {
		super(identifier);
	}

	// more methods
}

const sideDraw = new SideDrawElement('side-draw-1', 'left');
sideDraw.clone('new-location');
