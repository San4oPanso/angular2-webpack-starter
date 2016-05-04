import * as TodoActions from './todo.actions';
import {Reducer, Action, provideStore} from '@ngrx/store';
import {UndoRedoReducer} from '../core/undoredo';
import {Todo} from './todo.model';
export const initialState = new Array<Todo>();

export const TodosReducer: Reducer<any> = (state = initialState, action: TodoActions.TodoAction) => {
    const pTodo = action.payload;
    switch (action.type) {
        case TodoActions.ADD_TODO:
            console.log(pTodo);
            return state.concat(pTodo);

        case TodoActions.TOGGLE_TODO:
            return state.map(todo => {
                return todo.id !== pTodo.id ?
                    todo :
                    todo.clone().toggleCompleted()
            });
        case TodoActions.REMOVE_TODO:
            return state.filter(todo => todo.id !== pTodo.id);
        default:
            return state;
    }
}

export const TodosStore = provideStore({ todos: UndoRedoReducer(TodosReducer) }, initialState);