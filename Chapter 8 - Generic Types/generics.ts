let names: Array<string> = ['Max', 'Steve'];

type DataStore = {
    [key: string]: string | number;
};

let store: DataStore = {};

store.name = 'My Store';
// store.isInstructor = true; // Error: Type 'boolean' is not assignable to type 'string | number'.

// Instead, using generics
type DataStore2<T> = {
    [key: string]: T;
};

let store2: DataStore2<string | boolean> = {};
store2.name = 'My Store';
store2.isInstructor = true; // Now valid


// Example in use
function merge(a: any, b: any) {
    return [a, b]
}

const ids = merge(1, '2'); // inferred as any[]
ids[0] // this is now any 

// Can change to use generics
function merge2<T>(a: T, b: T): T[] {
    return [a, b]
}
const ids2 = merge2<number | string>(1, '2'); // inferred as (string | number)[]
ids2[0] // this is now string | number

// Can also do tihs
function merge3<T, U>(a: T, b: U): [T, U] {
    return [a, b]
}

// What if I want to create a new object that combines two objects?
// We can use constraints for the generic type
function mergeObject<T extends object>(a: T, b: T) {
    return {
        ...a,
        ...b
    }
}

const obj1 = mergeObject({name: 'Max'}, {age: 30});
console.log(obj1.name);

// Generic class 
class User<T> {
    constructor(public id: T) {}
}

const user1 = new User(12);
user1.id