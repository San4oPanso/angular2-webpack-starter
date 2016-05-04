export class Todo {
    constructor(
        public id: any,
        public text?: string,
        public completed?: boolean
    ) {
    }

    toggleCompleted(): Todo {
        this.completed = !this.completed;
        return this;
    }

    clone(): Todo {
        return new Todo(this.id, this.text, this.completed);
    }
}