const appUser = {
	name: "Alice",
	age: 28,
	permissions: [
		{
			id: "1",
			title: "Admin",
			description: "Administrator with full access"
		},
	]
}

type AppUserTypeOf = typeof appUser;

type AppUser = {
	name: string;
	age: number;
	permissions: {
		id: string;
		title: string;
		description: string;
	}[]
}

// Extract a part of a given type using indexed access types
type Perms = AppUser["permissions"]; // Type is array of permissions objects

/* 
Perms = {
        id: string;
        title: string;
        description: string;
    }[];
*/

// "number" is the keyword for the index type of arrays
type Perm = Perms[number]; // Extract the type of the elements that are stored in the array

/*
Perm = {
    id: string;
    title: string;
    description: string;
}
*/