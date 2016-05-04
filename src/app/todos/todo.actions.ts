import {Action} from '@ngrx/store';
import {Todo} from './todo.model';
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const SET_CURRENT_FILTER = 'SET_CURRENT_FILTER';

export class TodoAction implements Action {

    constructor(
        public type: string,
        public payload: Todo
    ) {
    }
}

export class TodoActions {
    nextToDoId: number;
    constructor() {
        this.nextToDoId = 0;
    }

    addTodo(text: string) {
        return new TodoAction(ADD_TODO, new Todo(
            this.nextToDoId++,
            text
        ));
    };

    toggleTodo(id: number) {
        return new TodoAction(TOGGLE_TODO, new Todo(id));
    };

    removeTodo(id: number) {
        return new TodoAction(REMOVE_TODO, new Todo(id));
    };
}