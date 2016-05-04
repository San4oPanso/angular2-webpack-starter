import {Component, HostBinding} from '@angular/core';
import {RxJSModel, IRxJSModel} from './rxjs.model';
import {WikiSmartComponent} from './wiki-smart/wiki-smart.component';
import {ButtonClickCountComponent} from './button-cc/button-cc.component.ts';

@Component({
    // The selector is what angular internally uses
    // for `document.querySelectorAll(selector)` in our index.html
    // where, in this case, selector is the string 'home'
    selector: 'rxjs',  // <home></home>
    // We need to tell Angular's Dependency Injection which providers are in our app.
    providers: [],
    // We need to tell Angular's compiler which directives are in our template.
    // Doing so will allow Angular to attach our behavior to an element
    directives: [WikiSmartComponent, ButtonClickCountComponent],
    // We need to tell Angular's compiler which custom pipes are in our template.
    pipes: [],
    // Our list of styles in our component. We may add more to compose many styles together
    styles: [],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    template: require('./rxjs.html')
})
export class RxJS {
    @HostBinding('class.clearfix')

    model: IRxJSModel;
    // TypeScript public modifiers
    constructor() {
        this.model = new RxJSModel();
    }

    ngOnInit() {
        console.log('hello `RxJSModel` ASYNC component', this.model);
    }
}



