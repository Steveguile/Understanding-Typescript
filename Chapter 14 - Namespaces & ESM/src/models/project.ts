
export enum Status {
	ACTIVE,
	FINISHED
}

// Do this to avoid literal
export class Project {
	constructor(public id: string, public title: string, public description: string, public people: number, public status: Status) {}
}