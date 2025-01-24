import { Component } from '@angular/core';
import {ApiListReference, ApiObjectReference, Pagination} from '../api.interfaces';
import {ApiService} from '../api.service';
import {Spell} from './spells.interface';
import {Observable, zip, zipWith} from 'rxjs';
import {SpellsArrayComponent} from './spells-array/spells-array.component';
import {SpellDetailsComponent} from './spell-details/spell-details.component';

@Component({
  selector: 'app-spells',
  imports: [
    SpellsArrayComponent,
    SpellDetailsComponent
  ],
  template: `
    <div class="container">
      <h1>Spells</h1>
      <p>All you need to know about spells</p>
      @if (spells.length > 0) {
        <div class="spells">
          <div class="array">
            <app-spells-array
              [spells]="spells"
              [spellCount]="spellCount"
              [pageSize]="pageSize"
              (selectedSpell)="selectASpell($event)"
              (selectedPage)="displayPage($event)" />
          </div>
        </div>
      } @else {
        <i>loading</i>
      }
    </div>
  `,
  styleUrl: './spells.component.css'
})
export class SpellsComponent {
  spellsReferences: ApiObjectReference[] = [];
  spellCount: number = 0;
  spells: Spell[] = []
  selectedSpell: Spell | undefined = undefined;
  pageSize: number = 20;

  constructor(private api: ApiService) {
    this.api.getSpells().subscribe((response: ApiListReference): void => {
      this.spellsReferences = response.results;
      this.spellCount = response.count;
      this.displayPage({offset: 0, limit: this.pageSize});
    });
  }

  displayPage(pagination: Pagination): void {
    zip(this.api.getAllReferences<Spell>(this.spellsReferences, pagination)).subscribe(response => {
      this.spells = response
    })
  }

  selectASpell(spell: Spell): void {
    this.selectedSpell = spell;
  }
}
