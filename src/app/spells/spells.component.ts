import { Component } from '@angular/core';
import {ApiObjectReference} from '../api.interfaces';
import {ApiService} from '../api.service';
import {Spell} from './spells.interface';
import {Observable} from 'rxjs';
import {SpellsArrayComponent} from './spells-array/spells-array.component';

@Component({
  selector: 'app-spells',
  imports: [
    SpellsArrayComponent
  ],
  template: `
    <div class="container">
      <h1>Spells</h1>
      <p>All you need to know about spells</p>
      <div class="spells">
        <div class="array">
          <app-spells-array [spells]="spells" (selectedSpell)="selectASpell($event)" />
        </div>
        <div class="details">
          @if (selectedSpell) {
            <h2>{{selectedSpell.name}}</h2>
          } @else {
           <p>No spell selected, click on a row to display details</p>
          }
        </div>
      </div>
    </div>
  `,
  styleUrl: './spells.component.css'
})
export class SpellsComponent {
  spells: Spell[] = []
  selectedSpell: Spell | undefined = undefined;

  constructor(private api: ApiService) {
    this.api.getSpells().subscribe((response: ApiObjectReference[]): void => {
      this.api.getAllReferences<Spell>(response).forEach( (observableSpell: Observable<Spell>): void => {
        observableSpell.subscribe( (spell: Spell): void => { this.spells.push(spell); })
      });
    });
  }

  selectASpell(spell: Spell): void {
    this.selectedSpell = spell;
  }

}
