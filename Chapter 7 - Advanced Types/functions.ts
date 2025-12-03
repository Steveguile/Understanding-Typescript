// Function overloading
function getLength(val: string): string;
function getLength(val: any[]): number;

function getLength(val: string | any[]) {
	if(typeof val === 'string') {
		const numberOfwords = val.split(' ').length;
		return `${numberOfwords} words`;
	}
	return val.length;
}


const numberOfwords = getLength("Hello world! This is TypeScript.");
console.log(numberOfwords); // Output: 5 words (string)
const numberOfItems = getLength([1, 2, 3, 4, 5]);
console.log(numberOfItems); // Output: 5 (number)