import {Component}        from 'angular2/core';
import {Control}          from 'angular2/common';

import {JSONP_PROVIDERS}  from 'angular2/http';
import {Observable}       from 'rxjs/Observable';

import {WikipediaService} from './wikipedia.service';

@Component({
    selector: 'wiki-smart',
    template: `
<form class="bs-component col-lg-4">
    <div class="form-group">
        <label class="control-label" for="inputDefault">Fetches when typing stops</label>
        <input type="text" class="form-control" id="inputDefault"
            [ngFormControl]="term">
    </div>
    <ul class="list-group">
        <li class="list-group-item" *ngFor="#item of items | async">{{item}}</li>
    </ul>
</form>
  `,
    providers: [JSONP_PROVIDERS, WikipediaService]
})
export class WikiSmartComponent {

    constructor(private _wikipediaService: WikipediaService) { }

    term = new Control();

    items: Observable<string[]> = this.term.valueChanges
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap((term: string) => this._wikipediaService.search(term));
}
