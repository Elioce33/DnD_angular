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
  templateUrl: './spells.component.html',
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
    this.api.getAllReferences<Spell>(this.spellsReferences, pagination).subscribe((response: Spell[]) => {
      this.spells = response
    })
  }

  selectASpell(spell: Spell): void {
    this.selectedSpell = spell;
  }
}
