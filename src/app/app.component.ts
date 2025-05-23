import { Component, OnInit } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from '@angular/router';
import { Store } from '@ngrx/store';
import { loadSpells } from '../store/spells/spells.actions';

@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterLink, RouterLinkActive],
  template: `
    <header>
      <h1>D&D information here</h1>
      <nav>
        <ul>
          <li>
            <a class="ribbon" routerLink="/" routerLinkActive="active"
               [routerLinkActiveOptions]="{ exact: true }" ariaCurrentWhenActive="page">Home</a>
          </li>
          <li>
            <a class="ribbon" routerLink="/classes" routerLinkActive="active"
               [routerLinkActiveOptions]="{ exact: true }" ariaCurrentWhenActive="page">Classes</a>
          </li>
          <li>
            <a class="ribbon" routerLink="/spells" routerLinkActive="active"
               [routerLinkActiveOptions]="{ exact: true }" ariaCurrentWhenActive="page">Spells</a>
          </li>
          <li>
            <a class="ribbon" routerLink="/equipments" routerLinkActive="active"
               [routerLinkActiveOptions]="{ exact: true }" ariaCurrentWhenActive="page">Equipment</a>
          </li>
          <li>
            <a class="ribbon" routerLink="/about" routerLinkActive="active"
               [routerLinkActiveOptions]="{ exact: true }" ariaCurrentWhenActive="page">About</a>
          </li>
        </ul>
      </nav>
    </header>
    <!-- The routed views render in the <router-outlet>-->
    <main>
      <router-outlet></router-outlet>
    </main>
    <footer>
      <div>
        Copyright 2025 Eliott COLLIN
      </div>
    </footer>
    `,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'D&D api reader';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadSpells());
  }
}
