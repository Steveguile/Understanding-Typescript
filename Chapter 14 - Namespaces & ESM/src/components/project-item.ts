// This is ES modules
import { Draggable } from '../models/drag-drop.js'; // js as if it were already compiled
import { Component } from './base-component.js';
import { Project } from '../models/project.js';
import { autobind } from '../decorators/autobind.js';

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {

	private project: Project

	get persons(): string {
		if (this.project.people === 1) {
			return '1 person'
		} else {
			return `${this.project.people} people`;
		}
	}

	constructor(hostId: string, project: Project) {
		super('single-project', hostId, false, project.id);
		this.project = project;
		this.configure() ;
		this.renderContent();
	}

	public configure() {
		this.element.addEventListener('dragstart', this.dragStartHandler);
		this.element.addEventListener('dragend', this.dragEndHandler);
	}

	public renderContent() {
		this.element.querySelector('h2')!.textContent = this.project.title;
		this.element.querySelector('h3')!.textContent = `${this.persons} assigned`;
		this.element.querySelector('p')!.textContent = this.project.description;
	}

	@autobind // This is the same as this.dragStartHandler.bind(this)
	public dragStartHandler(event: DragEvent): void {
		// dataTransfer is a special property on dataTransfer that allows extract on drop
		// Attach some plain text rather than object, and just get the id 
		event.dataTransfer!.setData('text/plain', this.project.id);
		event.dataTransfer!.effectAllowed = 'move'; // indicates to the browser to use a specific cursor when dragging
	}

	// _ tells ts I'm not doing anything with it
	@autobind
	public dragEndHandler(_: DragEvent): void {
		
	}

}