import * as TodoActions from './todo.actions';
import {Reducer, Action, provideStore, combineReducers} from '@ngrx/store';
import {UndoRedoReducer} from '../core/undoredo';
import {Todo} from './todo.model';
export const initialState = { todos: [new Todo(123, 'asd')] }; //new Array<Todo>()

export const TodosReducer: Reducer<any> = (state = initialState, action: TodoActions.TodoAction) => {
    const pTodo = action.payload;
    const todos = state.todos;
    switch (action.type) {
        case TodoActions.ADD_TODO:
            return wrapTodos(todos.concat(pTodo));

        case TodoActions.TOGGLE_TODO:
            return wrapTodos(todos.map(todo => {
                return todo.id !== pTodo.id ?
                    todo :
                    todo.clone().toggleCompleted()
            }));

        case TodoActions.REMOVE_TODO:
            return wrapTodos(todos.filter(todo => todo.id !== pTodo.id));
        default:
            return state;
    }
    function wrapTodos(todos) {
        return { todos };
    }

}
export const UndoRedoTodosReducer = UndoRedoReducer(TodosReducer);


export const initialState2 = {
    todos2: [new Todo(1231, 'a123123sd')]
};
export const TodosReducer2: Reducer<any> = (state = initialState2, action: TodoActions.TodoAction) => {
    const pTodo = action.payload;
    const todos = state.todos2;
    switch (action.type) {
        case TodoActions.ADD_TODO:
            return wrapTodos(todos.concat(pTodo));

        case TodoActions.TOGGLE_TODO:
            return wrapTodos(todos.map(todo => {
                return todo.id !== pTodo.id ?
                    todo :
                    todo.clone().toggleCompleted()
            }));

        case TodoActions.REMOVE_TODO:
            return wrapTodos(todos.filter(todo => todo.id !== pTodo.id));
        default:
            return state;
    }
    function wrapTodos(todos2) {
        return { todos2 };
    }
}
export const UndoRedoTodosReducer2 = UndoRedoReducer(TodosReducer2);