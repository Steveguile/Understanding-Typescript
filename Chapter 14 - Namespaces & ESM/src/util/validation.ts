// validation
export interface Validatable {
	value: string | number;
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	min?: number;
	max?: number;
}

export function validate(validateableInput: Validatable): boolean {
	let isValid = true;

	console.log(validateableInput)

	if(validateableInput.required) {
		isValid = isValid && validateableInput.value.toString().trim().length !== 0;
	}

	// != null is NOT (null and undefined)
	if (validateableInput.minLength !=null && validateableInput.minLength && typeof validateableInput.value === 'string') {
		isValid = isValid && validateableInput.minLength <= validateableInput.value.length
	}

	if (validateableInput.maxLength !=null && validateableInput.maxLength && typeof validateableInput.value === 'string') {
		isValid = isValid && validateableInput.maxLength >= validateableInput.value.length
	}

	if (validateableInput.min != null && typeof validateableInput.value === 'number') {
		isValid = isValid && validateableInput.value >= validateableInput.min;
	}

	if (validateableInput.max != null && typeof validateableInput.value === 'number') {
		isValid = isValid && validateableInput.value <= validateableInput.max;
	}

	return isValid;
}