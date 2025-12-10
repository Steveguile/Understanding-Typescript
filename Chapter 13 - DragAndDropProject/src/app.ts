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

class ProjectList {

	private templateElement: HTMLTemplateElement;
	private hostElement: HTMLDivElement;
	private element: HTMLElement;
	private assignedProjects: Project[] = [];

	constructor(private type: 'active' | 'finished') {
		this.templateElement = <HTMLTemplateElement>document.getElementById('project-list')!;
		// An alternative this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
		this.hostElement = <HTMLDivElement>document.getElementById('app')!;

		const importedNode = document.importNode(this.templateElement.content, true);
		this.element = importedNode.firstElementChild as HTMLFormElement;
		this.element.id = `${this.type}-projects`;

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

		this.attach();
		this.renderContent();
	}	

	private renderProjects() {
		const listElement = <HTMLUListElement>document.getElementById(`${this.type}-projects-list`)!;
		listElement.innerHTML = ''; // Get rid of all existing
		for (const projectItem of this.assignedProjects) {
			const listItem = document.createElement('li');
			listItem.textContent = projectItem.title;
			listElement.appendChild(listItem);
		}
	}

	private renderContent() {
		const listId = `${this.type}-projects-list`;
		this.element.querySelector('ul')!.id = listId;
		this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
	}

	private attach() {
		this.hostElement.insertAdjacentElement('beforeend', this.element);
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

class ProjectInput {

	private templateElement: HTMLTemplateElement;
	private hostElement: HTMLDivElement;
	private element: HTMLFormElement;
	private titleInputElement: HTMLInputElement;
	private descriptionInputElement: HTMLInputElement;
	private peopleInputElement: HTMLInputElement;

	constructor() {
		this.templateElement = <HTMLTemplateElement>document.getElementById('project-input')!;
		// An alternative this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
		this.hostElement = <HTMLDivElement>document.getElementById('app')!;

		const importedNode = document.importNode(this.templateElement.content, true);
		this.element = importedNode.firstElementChild as HTMLFormElement;
		this.element.id = 'user-input';

		this.titleInputElement = <HTMLInputElement>this.element.querySelector('#title');
		this.descriptionInputElement = <HTMLInputElement>this.element.querySelector('#description');
		this.peopleInputElement = <HTMLInputElement>this.element.querySelector('#people');

		this.configure();
		this.attach();
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


	private configure() {
		this.element.addEventListener('submit', this.submitHandler.bind(this)); // Bind this so that submitHandler has this context
	}

	private attach() {
		this.hostElement.insertAdjacentElement('afterbegin', this.element);
	}
}

class ProjectState {
	private listeners: Listener[] = [];
	private projects: Project[] = [];
	private static instance: ProjectState;

	private constructor() {

	}

	public static getInstance(): ProjectState {
		if (this.instance) {
			return this.instance;
		}
		this.instance = new ProjectState();
		return this.instance;
	}

	// Uses function type Listener
	public addListener(listenerFunction: Listener) {
		this.listeners.push(listenerFunction);
	}

	public addProject(title: string, description:string, numofPeople: number) {
		const newProject = new Project(Math.random.toString(),
			title,
			description,
			numofPeople,
			Status.ACTIVE
		);
		this.projects.push(newProject);
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

// Function type
type Listener = (items: Project[]) => void;

const projectState = ProjectState.getInstance();
const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');