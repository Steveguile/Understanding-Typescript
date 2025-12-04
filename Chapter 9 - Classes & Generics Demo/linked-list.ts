class ListNode<T> {
	public next?: ListNode<T>;
	constructor(public value: T) {}
}

class LinkedList<T> {
	// Remember private is a TypeScript feature
	private root?: ListNode<T>;
	private tail?: ListNode<T>;
	private _length = 0;

	add(value: T) {
		const node = new ListNode(value);
		if (!this.root || !this.tail) {
			this.root = node;
			this.tail = node;
		} else {
			this.tail.next = node;
			this.tail = node;
		}
		this._length++;
	};

	get length() {
		return this._length;
	};

	print(): void {
		let current = this.root;
		while (current) {
			console.log(current.value);
			current = current.next;
		}
	};

}

const numberList = new LinkedList<number>();
numberList.add(1);
numberList.add(2);
numberList.add(3);
numberList.print();	
console.log("Length:", numberList.length);
	
const stringList = new LinkedList<string>();
stringList.add("Hello");
stringList.add("World");
stringList.print();
console.log("Length:", stringList.length);