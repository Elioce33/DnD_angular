import { Component, OnInit } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from '@angular/router';
import { Store } from '@ngrx/store';
import { spellsActions } from '../store/spells/spells.actions';
import { classesActions } from '../store/classes/classes.actions';

@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'D&D api reader';
  navPages = [
    { title: 'Home', path: '/' },
    { title: 'Classes', path: '/classes' },
    { title: 'Spells', path: '/spells' },
    // { title: 'Equipment', path: '/equipments' },
    { title: 'About', path: '/about' }
  ]

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(spellsActions.loadSpells());
    this.store.dispatch(classesActions.loadClasses());
  }
}
