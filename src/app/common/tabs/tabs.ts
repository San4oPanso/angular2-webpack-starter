import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Tab } from './tab';

@Component({
    selector: 'tabs',
    template: `
    <ul class="nav nav-tabs">
      <li *ngFor="#tab of tabs" (click)="selectTab($event, tab)" [class.active]="tab.active">
        <a href="#">{{tab.title}}</a>
      </li>
    </ul>
    <ng-content></ng-content>
  `,
    directives: [NgFor]
})
export class Tabs {

    tabs: Tab[];

    constructor() {
        this.tabs = [];
    }
    selectTab($event, tab) {
        $event.preventDefault();
        _deactivateAllTabs(this.tabs);
        tab.active = true;

        function _deactivateAllTabs(tabs: Tab[]) {
            tabs.forEach((tabb) => tabb.active = false);
        }

    }
    // _deactivateAllTabs(){
    //   this.tabs.forEach((tab)=>tab.active = false);
    // }

    addTab(tab: Tab) {
        if (this.tabs.length === 0) {
            tab.active = true;
        }
        this.tabs.push(tab);
    }
}
