/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from '@angular/core';
import {RouteConfig, Router} from '@angular/router-deprecated';
import {MiddleWareLogs} from './core';
import {Home} from './home';
import {AppState} from './app.service';
import {RouterActive} from './router-active';
import {AppStore} from './app.store';
import {Hotkeys} from './core/hotkeys';
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [],
  providers: [...MiddleWareLogs, AppStore, Hotkeys],
  directives: [RouterActive],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('normalize.css'),
    `
    md-toolbar ul {
      display: inline;
      list-style-type: none;
      margin: 0;
      padding: 0;
      width: 60px;
    }
    md-toolbar li {
      display: inline;
    }
    md-toolbar li.active {
      background-color: lightgray;
    }
  `
  ],
  template: `
    <header>
    <md-toolbar color="primary">
      <span>{{ name }}</span>
      <nav>
        <ul>
          <li router-active>
            <a [routerLink]=" ['Index'] ">Index</a>
          </li>
          |
          <li router-active>
            <a [routerLink]=" ['Home'] ">Home</a>
          </li>
          |
          <li router-active>
            <a [routerLink]=" ['About'] ">About</a>
          </li>
          <li router-active>
            <a [routerLink]=" ['San4o'] ">San4o</a>
          </li> 
          <li router-active>
            <a [routerLink]=" ['RxJS'] ">RxJS</a>
          </li>
          <li router-active>
            <a [routerLink]=" ['D3JSComponent'] ">D3</a>
          </li>
          <li router-active>
            <a [routerLink]=" ['TodosComponent'] ">Todos</a>
          </li>
        </ul>
      </nav>
    </md-toolbar>
    </header>
    <md-progress-bar mode="indeterminate" color="primary" *ngIf="loading"></md-progress-bar>

    <main>
      <router-outlet></router-outlet>
    </main>

    <pre>this.appState.state = {{ appState.state | json }}</pre>

    <footer>
      WebPack Angular 2 Starter by <a [href]="url">@AngularClass</a>
      <span>
        <img [src]="angularclassLogo" width="1%">
      </span>
    </footer>
  `
})
@RouteConfig([
  { path: '/', name: 'Index', component: Home, useAsDefault: true },
  { path: '/home', name: 'Home', component: Home },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  { path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About') },
  { path: '/san4o', name: 'San4o', loader: () => require('es6-promise!./san4o')('San4o') },
  { path: '/rxjs-demo', name: 'RxJS', loader: () => require('es6-promise!./rxjs')('RxJS') },
  { path: '/d3js-demo', name: 'D3JSComponent', loader: () => require('es6-promise!./d3js')('D3JSComponent') },
  { path: '/todos', name: 'TodosComponent', loader: () => require('es6-promise!./todos')('TodosComponent') },
])
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  loading = false;
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';

  constructor(
    public appState: AppState, public hotkeys: Hotkeys) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */