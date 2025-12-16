
// autobind decorator, notice how this is typescript decorator not used previously
// Check tsconfig "target" version
export function autobind(
	target: any,
	methodName: string,
	descriptor: PropertyDescriptor
) {
	const originalMethod = descriptor.value;
	const adjDescriptor: PropertyDescriptor = {
		configurable: true,
		get() {
			const boundFunction = originalMethod.bind(this);
			return boundFunction;
		}
	}
	return adjDescriptor;
}