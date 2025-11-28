const inputEl = document.getElementById('user-name');

console.log(inputEl.value); // Won't compile because inputEl might be null.

// Adding throw here changes the type from HTMLElement | null to just HTMLElement. This is called type narrowing in ts
if (!inputEl) {
  throw new Error('Element not found!');
}

console.log(inputEl.value); // Now inputEl is fine but value isn't. This error is saying it does not know if inputEl is an HTMLInputElement which has the value property.

const typeCastedInputEl = inputEl as HTMLInputElement; // Type assertion (type casting)

console.log(typeCastedInputEl.value); // Now it works because we told ts that this is an HTMLInputElement which has the value property.

const inputEl2 = document.getElementById('user-name')!;
console.log(inputEl2!.value); // Using ! tells ts that it won't be null, but be careful with this!  You're essentially disabling typescript and can lead to runtime errors.

const inputEl3 = document.getElementById('user-name');
// This is an inline check to see if inputEl3 is null before accessing value
console.log(inputEl3?.value); // Using optional chaining to only access value if inputEl3 is not null or undefined. This used to be Typescript 3.7 feature but is now JavaScript.

