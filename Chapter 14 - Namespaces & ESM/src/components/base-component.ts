// Component Base Class (abstract so it must be extended)
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
