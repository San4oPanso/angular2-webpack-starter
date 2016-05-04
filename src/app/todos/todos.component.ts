import {Component, HostBinding, ChangeDetectionStrategy, NgZone} from 'angular2/core';
import {Control, ControlGroup, FormBuilder, Validators} from 'angular2/common';
import {Todo} from './todo.model';
import {TodosStore} from './todo.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {TodoActions} from './todo.actions';
import {NgForm}    from 'angular2/common';
import {UNDO, REDO} from '../core/undoredo';

@Component({
    selector: 'todos',  // <home></home>
    providers: [TodoActions],
    directives: [],
    styles: [],
    template: require('./todos.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent {
    @HostBinding('class.clearfix') true;
    // model = new TodosModel();
    todos: Observable<Todo>;
    todoForm: ControlGroup;
    canUndo: boolean;
    canRedo: boolean;
    private _todosStore: Observable<{}>;
    onClick_BoundableUndo = () => { this.zone.run(this.onClick_Undo.bind(this)); }
    constructor(fb: FormBuilder, public store: Store<any>, private TodoActions: TodoActions, private zone: NgZone) {
        this.todoForm = fb.group({
            text: ["", Validators.required],
        });
        this._todosStore = this.store.select('todos');
        this.todos = this._todosStore.combineLatest((data: any) => data.present);
        var _that = this;
        this._todosStore.subscribe(function (data: any) {
            console.log(data);
            _that.canUndo = data.past.length > 0;
            _that.canRedo = data.future.length > 0;
        });
    }
    ngOnInit() {
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
        this.store.dispatch({ type: UNDO });
    }
    onClick_Redo() {
        this.store.dispatch({ type: REDO });
    }
}


