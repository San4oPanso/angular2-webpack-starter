import {Component, HostBinding}        from 'angular2/core';
import {JSONP_PROVIDERS}  from 'angular2/http';
import {Observable}       from 'rxjs/Observable';
import {Subject}          from 'rxjs/Subject';

import {WikipediaService} from './wikipedia.service';

@Component({
    selector: 'wiki-smart',
    template: `
<form class="bs-component col-lg-4">
    <div class="form-group">
        <label class="control-label" for="inputDefault">Fetches when typing stops</label>
        <input #term (keyup)="search(term.value)" type="text" class="form-control" id="inputDefault">
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

    private _searchTermStream = new Subject<string>();

    search(term: string) { this._searchTermStream.next(term); }

    items: Observable<string[]> = this._searchTermStream
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap((term: string) => this._wikipediaService.search(term));
}