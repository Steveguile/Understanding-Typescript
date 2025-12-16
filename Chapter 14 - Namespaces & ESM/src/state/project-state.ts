import { Project, Status } from '../models/project';

// Function type
export type Listener<T> = (item: T[]) => void;

export class State<T> {
	protected listeners: Listener<T>[] = [];

	// Uses function type Listener
	public addListener(listenerFunction: Listener<T>) {
		this.listeners.push(listenerFunction);
	}
}

export class ProjectState extends State<Project> {

	private projects: Project[] = [];
	private static instance: ProjectState;

	private constructor() {
		super();
	}

	public static getInstance(): ProjectState {
		if (this.instance) {
			return this.instance;
		}
		this.instance = new ProjectState();
		return this.instance;
	}

	public addProject(title: string, description:string, numofPeople: number) {
		const newProject = new Project(Math.random().toString(),
			title,
			description,
			numofPeople,
			Status.ACTIVE
		);
		this.projects.push(newProject);
		this.updateListeners();
	}

	// Moves project from one list to another
	public moveProject(projectId: string, newStatus: Status) {
		const project = this.projects.find(project => project.id === projectId)
		if (project && project.status !== newStatus) {
			project.status = newStatus;
			this.updateListeners();
		}
	}

	private updateListeners() {
		for (const listenerFunction of this.listeners) {
			listenerFunction(this.projects.slice()); // slice only returns copy instead of references
		}
	}

}

export const projectState = ProjectState.getInstance();