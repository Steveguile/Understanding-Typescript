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

		// Don't do this
		if (enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredPeople.trim().length === 0) {
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

const projectInput = new ProjectInput();