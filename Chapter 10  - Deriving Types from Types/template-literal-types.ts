// Vanilla js template literal
const steveName = 'Steve';
const greeting = `Hi there, ${steveName}.`;

// Back to Ts
type ReadPermissions = 'no-read' | 'read';
type WritePermissions = 'no-write' | 'write';

// Could do this
type FilePermissionsUnion = ReadPermissions | WritePermissions;

// Or do it by hand
type FilePermissionsStringLiteralUnion = 'no-read-write' | 'read-no-write' | 'no-read-no-write' | 'read-write';

// Or do it with template literals 
type FilePermissions = `${ReadPermissions}-${WritePermissions}`; // This becomes the above

// Where would this be useful
type DataFile = {
	data: string;
	permissions: FilePermissions
}

type DataFileEventNames = `${keyof DataFile}-Changed`

// New type should contain methods where method names are related to property names of DataFile
type DataFileEvents = {
	[Key in DataFileEventNames]: () => void; // Want to store some functions that return nothing under these names
}

let event2: DataFileEvents = {
	"data-Changed"() {

	},
	"permissions-Changed"() {
		
	}
};