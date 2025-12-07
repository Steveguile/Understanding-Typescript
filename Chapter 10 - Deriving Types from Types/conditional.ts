type StringArray = string[];
type ElementType = StringArray[number]; // Could do this using index access type
// Could turn it into generic like this:
type ElementTypeGeneric<T extends any[]> = T[number]
type Example1 = ElementTypeGeneric<StringArray>; // string

// Above will only work for array
let text = 'hello';
// type Example2 = ElementTypeGeneric<typeof text>; // string is not any[]

// Can use conditional type feature instead by using turnary syntax on right side of equal sign
type GetElementType<T> = T extends any[] ? T[number] : T;
type Example3 = GetElementType<StringArray>; // string
type Example4 = GetElementType<typeof text>; // string

// Why would we do the above? They're very niche and probably only need when building library and frameworks.


// Example in practice
type FullNamePerson = {firstName: string; lastName: string};
type FullNameOrNothing<T> = T extends FullNamePerson ? string : never;
function getFullName<T extends object>(person: T): FullNameOrNothing<T> {
	if ('firstName' in person && 'lastName' in person && person.firstName && person.lastName) {
		return `${person.firstName} ${person.lastName}` as FullNameOrNothing<T>;
	} 

	throw new Error('No fist name and / or last name found.');
}

const name1 = getFullName({}); // never
const name2 = getFullName({firstName: 'Steve'}) // never
const name3 = getFullName({firstName: 'Steve', lastName: 'Whitehead'}); // string