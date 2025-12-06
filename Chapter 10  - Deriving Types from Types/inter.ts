function add(a: number, b: number) {
	return a + b;
}


// This gets parameter types
type AddFn = typeof add;

// What if you want return value type
// extends (...args: any[]) => {} means extends any function that takes any parameters using rest
type ReturnValueType<T> = T extends (...args: any[]) => infer RV ? RV : never;

type AddFnReturnValueType = ReturnValueType<AddFn>;