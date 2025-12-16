import { Component } from "./base-component";
import { Validatable, validate } from "../util/validation";
import { autobind } from "../decorators/autobind";
import { projectState } from "../state/project-state";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {

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