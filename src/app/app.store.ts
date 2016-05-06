import {provideStore, combineReducers} from '@ngrx/store';
import {UndoRedoTodosReducer, TodosReducer, TodosReducer2, UndoRedoTodosReducer2} from './todos/todo.reducer';

let appReducer = combineReducers({
    todos: UndoRedoTodosReducer,
    todos2: TodosReducer2
});

export const AppStore = provideStore(appReducer);
