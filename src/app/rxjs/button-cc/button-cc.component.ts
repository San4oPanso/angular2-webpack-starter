import {Component, HostBinding, EventEmitter, OnInit}        from 'angular2/core';
import {Observable}       from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import {Subject}          from 'rxjs/Subject';
import {XButton} from '../../common/button';
@Component({
    selector: 'button-cc',
    template: `
<form class="bs-component col-lg-4">
    <div class="form-group">
        <label class="control-label" for="bufferTime">Counting clicks. Buffering time</label>
        <input class="form-control" id="bufferTime" type="number" step="50" min="100"
             [(ngModel)]="bufferTime">
    </div>
<div class="form-group">

</div>
    <div class="form-group">
        <button id="x" class="btn-lg btn-block"
            [x-button] (click)="clickEmitter.next($event)">CLICK ME</button>
    </div>
    <ul class="list-group">
        <li class="list-group-item" *ngFor="#item of items">{{item}}x clicks</li>
    </ul>
</form>
  `,
    directives: [XButton]
})
export class ButtonClickCountComponent implements OnInit {
    items: number[] = [];
    bufferTime: number;
    public clickEmitter = new Subject<any>();

    ngOnInit() {
        let button = document.getElementById('x');

        let clickDebounce = this.clickEmitter
            .debounce(() => Observable.timer(this.bufferTime));

        let bufferedClicksCount = this.clickEmitter
            .buffer(clickDebounce)
            .map(list => list.length);

        bufferedClicksCount.subscribe(x => {
            this.items.unshift(x);
            if (this.items.length > 5) this.items.length = 5;
        });
    }

    constructor() {
        this.bufferTime = 300;
    }
}
