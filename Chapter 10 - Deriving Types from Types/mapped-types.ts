type Operations = {
	add: (a: number, b: number) => number;
	subtract: (a: number, b: number) => number;
};

type Results = {
	add: number, 
	subtract: number
}

let mathOperations: Operations = {
	add: (a, b) => a + b,
	subtract: (a, b) => a - b,
};

let mathResults : Results = {
	add: mathOperations.add(5, 3),
	subtract: mathOperations.subtract(10, 4),
};

// We could instead do this
// Mapped type to transform Operations into Results
type MappedResults<T, U> = {
	[Method in keyof T]: U;
}
// Notice how if we change this to string, TypeScript will give us an error in the assignment below
let mappedMathResults: MappedResults<Operations, number> = {
	add: mathOperations.add(2, 2),
	subtract: mathOperations.subtract(8, 3),
};

// All you to make properties optional if they weren't before, and vice versa
type PartialMapped<T, U> = {
	[Method in keyof T]?: U;
}

// Notice how we can now omit properties
let mappedMathResultPartial: PartialMapped<Operations, number> = {
	add: mathOperations.add(1, 1)
}

// This is how to remove optionality. -? is the operator
type Operations2= {
	add?: (a: number, b: number) => number;
	subtract?: (a: number, b: number) => number;
}
type PartialMappedRemoveOptional<T, U> = {
	[Method in keyof T]-?: U;
}
// See this errors
let partialMappedResultRemoveOptional: PartialMappedRemoveOptional<Operations2, number> = {

}


// Can do the same to add/remove readonly:
type ResultsReadOnly<T, U> = {
	readonly [Method in keyof T]: U;
}
type RemoveReadOnly<T, U> = {
	-readonly [Method in keyof T]: U;
}