// Decorators are meta programming constructs. This file is all ECMAScript Decorators and can be used iwthout TypeScript
// Allow you to write code that changes the behaviour of other code
// Angular is a good example of a decorator library
// Is an OO feature - so just for classes and things in classes

// Decorators in JS are just functions. For ECMA decorators they require 2 arguments
// T extends new() => {} represends "generic extends new class with any arguments"
function logger<T extends new (...args: any[]) => any>(target: T, ctx: ClassDecoratorContext) {
	console.log('logger decorator');
	console.log(target);
	console.log(ctx);

	// To change a class we return a new class that is based on the old class
	return class extends target {
		constructor(...args: any[]){
			super(...args);
			console.log('class constructor');
			console.log(this);
		}
	};
}; // target is the thing you're tagging, ctx is added information

// Function is a type built into typescript, which is same as (...args: any[]) => any
function autobind(target: Function, ctx: ClassMethodDecoratorContext) {
	ctx.addInitializer(function(this: any) {
		// This is the class to which this method belongs
		this[ctx.name] = this[ctx.name].bind(this);
	}) // This is a utility method 

	return function(this: any) {
		console.log('Executing original function');
		target(); // Call original method after, but target is the original method without being tweaked above, so this context will still be undefined
		// Instead do this
		target.apply(this);
	}
}

function replacer<T>(initValue: T) {
	return function replacerDecorator(target: undefined, ctx: ClassFieldDecoratorContext) { // target will always be undefined for field decorators because the decorator code will always be executed before the field is done initialising
		console.log(target);
		console.log(ctx);

		// You can access the value in the field in this return statement
		return (initialValue: any) => {
			console.log(initialValue);
			// return ''; // This overrides field to be empty
			return initValue;
		}
	}
}



@logger
class Person {

	@replacer('MainSteve')
	name = 'Steve';

	@autobind
	greet() {
		console.log('Hi, I am ' + this.name);
	}
};

const steve = new Person();
const anotherName = new Person();

/*
This log is output when the class definition is parsed by js 
logger decorator
[Function: Person]
{
  kind: 'class',
  name: 'Person',
  metadata: undefined,
  addInitializer: [Function (anonymous)]
}

This log is output when the class is instantiated
class constructor
class_1 { name: 'Steve' }
class constructor
class_1 { name: 'Steve' }
*/

const hila = new Person();
const greet = hila.greet; // Store pointer to method from hila instance
greet(); // What this will return is "Hi, I am undefined" as we are trying to access this
// When exeuting like hila.greet(), this keyword context is hila. When called as a pointer then this is undefined in js
// You can bind context in classes to solve this, like this:
/*
constructor() {
this.greet = this.greet.gind(this)
}
*/
// Or alternatively with autobind decorator