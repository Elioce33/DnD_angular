import {Component, OnInit} from '@angular/core';
import {Pagination} from '../../models/api.interfaces';
import {ApiService} from '../api.service';
import {ISpell} from '../../models/spells.interface';
import {Observable} from 'rxjs';
import {SpellsArrayComponent} from './spells-array/spells-array.component';
import {SpellDetailsComponent} from './spell-details/spell-details.component';
import { Store } from '@ngrx/store';
import { selectSpellList } from '../../store/spells/spells.selectors';
import {spellsActions} from '../../store/spells/spells.actions';

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
  spellsList$: Observable<ISpell[]> = new Observable<ISpell[]>();

  protected PAGE_SIZE: number = 20;

  private spellsReferences: ISpell[] = []; // the list of every spell (contains full spell or just the reference)
  private pagination: Pagination = {offset: 0, limit: this.PAGE_SIZE};

  protected spells: ISpell[] = []; // list of displayed spells, based on this.pagination
  protected spellCount: number = 0;
  protected selectedSpell: ISpell | undefined = undefined;
  protected isLoading = true;


  constructor(private store: Store) {
    this.spellsList$ = this.store.select(selectSpellList);

    this.spellsList$.subscribe((spells: ISpell[]) => {
      this.spellsReferences = spells;
      this.spellCount = spells.length;

      const slicedSpellReferences = this.spellsReferences.slice(this.pagination.offset, this.pagination.offset + this.pagination.limit);
      const everySpellLoaded = slicedSpellReferences.reduce( (accumulator: boolean, currentValue: ISpell) => !!currentValue.updated_at, false )
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

  selectASpell(spell: ISpell): void {
    this.selectedSpell = spell;
  }
}
