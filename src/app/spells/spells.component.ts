import {Component, OnInit} from '@angular/core';
import {Pagination} from '../../models/api.interfaces';
import {ApiService} from '../api.service';
import {Spell} from '../../models/spells.interface';
import {Observable} from 'rxjs';
import {SpellsArrayComponent} from './spells-array/spells-array.component';
import {SpellDetailsComponent} from './spell-details/spell-details.component';
import { Store } from '@ngrx/store';
import { selectSpellList } from '../../store/store.selectors';
import {spellsActions} from '../../store/store.actions';

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

  protected PAGE_SIZE: number = 20;

  private spellsReferences: Spell[] = []; // the list of every spell (contains full spell or just the reference)
  private pagination: Pagination = {offset: 0, limit: this.PAGE_SIZE};

  protected spells: Spell[] = []; // list of displayed spells, based on this.pagination
  protected spellCount: number = 0;
  protected selectedSpell: Spell | undefined = undefined;
  protected isLoading = true;


  constructor(private store: Store) {
    this.spellsList$ = this.store.select(selectSpellList);

    this.spellsList$.subscribe((spells: Spell[]) => {
      this.spellsReferences = spells;
      this.spellCount = spells.length;

      const slicedSpellReferences = this.spellsReferences.slice(this.pagination.offset, this.pagination.offset + this.pagination.limit);
      const everySpellLoaded = slicedSpellReferences.reduce( (accumulator: boolean, currentValue: Spell) => !!currentValue.updated_at, false )
      if(everySpellLoaded) {
        this.spells = slicedSpellReferences;
        this.isLoading = false;
      } else {
        this.store.dispatch(spellsActions.loadSpellsFromReferences(this.pagination));
      }
    })

  }

  displayPage(pagination: Pagination): void {
    this.pagination = pagination;
    this.isLoading = true;
    this.store.dispatch(spellsActions.loadSpellsFromReferences(this.pagination));
  }

  selectASpell(spell: Spell): void {
    this.selectedSpell = spell;
  }
}
