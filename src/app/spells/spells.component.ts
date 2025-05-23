import {Component} from '@angular/core';
import {Pagination} from '../../models/api.interfaces';
import {ApiService} from '../api.service';
import {Spell} from '../../models/spells.interface';
import {Observable} from 'rxjs';
import {SpellsArrayComponent} from './spells-array/spells-array.component';
import {SpellDetailsComponent} from './spell-details/spell-details.component';
import { Store } from '@ngrx/store';
import { selectSpellList } from '../../store/store.selectors';

@Component({
  selector: 'app-spells',
  imports: [
    SpellsArrayComponent,
    SpellDetailsComponent
  ],
  templateUrl: './spells.component.html',
  styleUrl: './spells.component.scss'
})
export class SpellsComponent {
  spellsList$: Observable<Spell[]> = new Observable<Spell[]>();

  spellsReferences: Spell[] = [];
  spellCount: number = 0;
  spells: Spell[] = []
  selectedSpell: Spell | undefined = undefined;
  pageSize: number = 20;

  constructor(private api: ApiService, private store: Store) {
    this.spellsList$ = this.store.select(selectSpellList);

    this.spellsList$.subscribe((spells: Spell[]) => {
      console.log("spells", spells);
      this.spellsReferences = spells;
      this.spellCount = spells.length;
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
