// Drag & Drop interfaces
interface Draggable {
	dragStartHandler(event: DragEvent): void; // DragEvent is built in
	dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
	dragOverHandler(event: DragEvent): void;
	dropHandler(event: DragEvent): void;
	dragLeaveHandler(event: DragEvent): void;
}

// autobind decorator, notice how this is typescript decorator not used previously
// Check tsconfig "target" version
function autobind(
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

// Component Base Class (abstract so it must be extended)
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
	private templateElement: HTMLTemplateElement;
	public hostElement: T;
	public element: U;

	constructor(templateId: string, hostElementId: string, insertAtBeginning: boolean, newElementId?: string) {

		this.templateElement = <HTMLTemplateElement>document.getElementById(templateId)!;
		// An alternative this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
		this.hostElement = <T>document.getElementById(hostElementId)!;


		const importedNode = document.importNode(this.templateElement.content, true);
		this.element = importedNode.firstElementChild as U;
		if (newElementId) {
			this.element.id = newElementId;
		}

		this.attach(insertAtBeginning);
	}

	private attach(insertAtBeginning: boolean) {
		this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
	}

	// Abstract so must be implemented
	abstract configure(): void
	abstract renderContent(): void

}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {

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

class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {

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

// validation
interface Validatable {
	value: string | number;
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	min?: number;
	max?: number;
}

function validate(validateableInput: Validatable): boolean {
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

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {

	private titleInputElement: HTMLInputElement;
	private descriptionInputElement: HTMLInputElement;
	private peopleInputElement: HTMLInputElement;

	constructor() {
		super('project-input', 'app', true, 'user-input')

		this.titleInputElement = <HTMLInputElement>this.element.querySelector('#title');
		this.descriptionInputElement = <HTMLInputElement>this.element.querySelector('#description');
		this.peopleInputElement = <HTMLInputElement>this.element.querySelector('#people');

		this.configure();
	}

	private gatherUserInput(): [string, string, number] | void {
		const enteredTitle = this.titleInputElement.value;
		const enteredDescription = this.descriptionInputElement.value;
		const enteredPeople = this.peopleInputElement.value;

		const titleValidatable: Validatable = {
			value: enteredTitle,
			required: true
		}

		const descriptionValidatable: Validatable = {
			value: enteredDescription,
			required: true,
			minLength: 5
		}

		const peopleValidatable: Validatable = {
			value: enteredPeople,
			required: true,
			min: 1,
			max: 5
		}

		console.log(titleValidatable);
		console.log(descriptionValidatable);
		console.log(peopleValidatable);

		// Don't do this
		// if (enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredPeople.trim().length === 0) {
		if(
			!validate(titleValidatable) ||
			!validate(descriptionValidatable) ||
			!validate(peopleValidatable)
		) {
			alert('Invalid input')
			return;
		} else {
			return [enteredTitle, enteredDescription, +enteredPeople]
		}
	}

	// Public methods by convention go above private in ts
	public configure() {
		this.element.addEventListener('submit', this.submitHandler.bind(this)); // Bind this so that submitHandler has this context
	}

	public renderContent() {}

	private clearInputs() {
		this.titleInputElement.value = '';
		this.descriptionInputElement.value = '';
		this.peopleInputElement.value = '';
	}

	@autobind
	private submitHandler(event: Event) {
		event.preventDefault(); // prevent default form submition which triggers http request
		const userInput = this.gatherUserInput();
		if (Array.isArray(userInput)) {
			const[title, desc, people] = userInput;
			projectState.addProject(title, desc, people);
			console.log(title, desc, people)
		}
		this.clearInputs();
	}

}

// Function type
type Listener<T> = (item: T[]) => void;

class State<T> {
	protected listeners: Listener<T>[] = [];

	// Uses function type Listener
	public addListener(listenerFunction: Listener<T>) {
		this.listeners.push(listenerFunction);
	}
}

class ProjectState extends State<Project> {

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

enum Status {
	ACTIVE,
	FINISHED
}

// Do this to avoid literal
class Project {
	constructor(public id: string, public title: string, public description: string, public people: number, public status: Status) {}
}


const projectState = ProjectState.getInstance();
const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');