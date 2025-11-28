// enum keyword is ts not js
enum Roles {
	Admin,
	Editor,
	Guest
}

let userRole = Roles.Admin;

// Alternative to enum is union with literal type
let userRole2: 'Admin' | 'Editor' | 'Guest' = 'Editor';

// Type alias. type is ts not js
type RoleType = 'Admin' | 'Editor' | 'Guest';
let userRole3 : RoleType = 'Editor';

// Object type
type User = {
	name: string;
	role: RoleType;
}