import { ProjectItem } from "./project-item";
import { Component } from "./base-component";
import { type DragTarget } from "../models/drag-drop"; // Can do this with interfaces add extra information to determine if it's an actual ts feature or something that can be converted to js
import { Project, Status } from "../models/project";
import { autobind } from "../decorators/autobind";
import { projectState} from "../state/project-state";

// default can be used alongside normal export. You can import like import (GIVE IT A NAME) from ...
export default class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {

	private assignedProjects: Project[] = [];

	constructor(private type: 'active' | 'finished') {
		super('project-list', 'app', false, `${type}-projects`);

		this.configure();
		this.renderContent();
	}	

	// This would love to be private, but private abstract from parent is not supported in ts
	public renderProjects() {
		const listElement = <HTMLUListElement>document.getElementById(`${this.type}-projects-list`)!;
		listElement.innerHTML = ''; // Get rid of all existing
		for (const projectItem of this.assignedProjects) {
			new ProjectItem(this.element.querySelector('ul')!.id, projectItem); // this.element....id is this unordered list
		}
	}

	public configure() {
		this.element.addEventListener('dragover', this.dragOverHandler);
		this.element.addEventListener('dragleave', this.dragLeaveHandler);
		this.element.addEventListener('drop', this.dropHandler);

		projectState.addListener((projects: Project[]) => {
			const relevantProjects = projects.filter(project => {
				if (this.type === 'active') {
					return project.status == Status.ACTIVE;
				} else {
					return project.status == Status.FINISHED;
				}
			});
			this.assignedProjects = relevantProjects;
			this.renderProjects();
		});

	};

	public renderContent() {
		const listId = `${this.type}-projects-list`;
		this.element.querySelector('ul')!.id = listId;
		this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
	}

	@autobind // Binds this
	public dragOverHandler(event: DragEvent): void {
		// Is the data attached to our drag event, one that matches dragStartHandler from ProjectItem
		if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
			event.preventDefault(); // Must prevent default to allow drop (i.e. triggering dropHandler)
			const listEl = this.element.querySelector('ul')!;
			listEl.classList.add('droppable');
		}
	}

	@autobind
	public dragLeaveHandler(_: DragEvent): void {
		const listEl = this.element.querySelector('ul')!;
		listEl.classList.remove('droppable');
	}

	@autobind
	public dropHandler(event: DragEvent): void {
		const projectId = event.dataTransfer!.getData('text/plain');
		projectState.moveProject(
			projectId,
			this.type === 'active' ? Status.ACTIVE : Status.FINISHED
		);
	}

}