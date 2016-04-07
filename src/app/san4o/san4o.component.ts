import {Component} from 'angular2/core';
import {AppState} from '../app.service';
import {San4oModel, ISan4oModel} from './san4o.model';
import {Tabs, Tab} from '../common/tabs';
import {xButton}  from '../common/button';

@Component({
    // The selector is what angular internally uses
    // for `document.querySelectorAll(selector)` in our index.html
    // where, in this case, selector is the string 'home'
    selector: 'san4o',  // <home></home>
    // We need to tell Angular's Dependency Injection which providers are in our app.
    providers: [],
    // We need to tell Angular's compiler which directives are in our template.
    // Doing so will allow Angular to attach our behavior to an element
    directives: [Tabs, Tab, xButton],
    // We need to tell Angular's compiler which custom pipes are in our template.
    pipes: [],
    // Our list of styles in our component. We may add more to compose many styles together
    styles: [],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    template: require('./san4o.html')
})
export class San4o {
    model: ISan4oModel;
    // TypeScript public modifiers
    constructor(private appState: AppState) {
        let modelState = this.appState.get('San4oModel');
        if (!modelState) {
            this.model = new San4oModel('Alex2');
            this.appState.set('San4oModel', this.model);
        } else {
            this.model = modelState;
        }
    }

    ngOnInit() {
        console.log('hello `SAN4O` ASYNC component', this.model);
        // this.title.getData().subscribe(data => this.data = data);
    }

    onButtonClick() {
        this.model.onButtonClick();
    }
}
