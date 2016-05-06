import {Component, HostBinding, ChangeDetectionStrategy, NgZone} from '@angular/core';
import {Control, ControlGroup, FormBuilder, Validators} from '@angular/common';
import {Todo} from './todo.model';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {TodoActions} from './todo.actions';
import {NgForm}    from '@angular/common';
import {UNDO, REDO} from '../core/undoredo';

@Component({
    selector: 'todos',  // <home></home>
    providers: [TodoActions, FormBuilder],
    directives: [],
    styles: [],
    template: require('./todos.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent {
    @HostBinding('class.clearfix') true;
    // model = new TodosModel();
    todos: Observable<Todo>;
    todos2: Observable<Todo>;
    todoForm: ControlGroup;
    canUndo: boolean;
    canRedo: boolean;
    onClick_BoundableUndo = () => { this.zone.run(this.onClick_Undo.bind(this)); };
    onClick_BoundableRedo = () => { this.zone.run(this.onClick_Redo.bind(this)); };

    constructor(fb: FormBuilder, public store: Store<any>, private TodoActions: TodoActions, private zone: NgZone) {
        this.todoForm = fb.group({
            text: ["", Validators.required],
        });

        let todosStore = this.store.select('todos');
        this.todos = todosStore.combineLatest((data: any) => data.present.todos);
        todosStore.subscribe((data: any) => {
            this.canUndo = data.past.length > 0;
            this.canRedo = data.future.length > 0;
        });

        let todosStore2 = this.store.select('todos2');
        this.todos2 = todosStore2.combineLatest((data: any) => data.todos2);
    }

    onClick_AddTodo() {
        //this.model.addTodo(this.newTodo.value);
        this.store.dispatch(this.TodoActions.addTodo(this.todoForm.value.text));
        (<Control>this.todoForm.controls['text']).updateValue('');
    }

    onClick_ToggleDone(todoid: number) {
        //todo.toggleDone();
        this.store.dispatch(this.TodoActions.toggleTodo(todoid));
    }

    onClick_Undo() {
        this.canUndo && this.store.dispatch({ type: UNDO });
    }

    onClick_Redo() {
        this.canRedo && this.store.dispatch({ type: REDO });
    }
}


