function process(val: string | number) {} // We might not know all eventual values 
function process2(val: any) {
	val.log(); // We don't know anything about the value, but will allow anything. TypeScript won't help us here

} 
function process3(val: unknown) {
	val.log(); // We don't know anything about the value, but will only allow safe operations.

	// Have to type check. Forced to write safe code and avoid runtime errors
	if (typeof val === "object" && val && 'log' in val && typeof val.log === 'function') {
		val.log();
	}
} 
