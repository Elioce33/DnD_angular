import {Component, EventEmitter, Inject, Input, Output, SimpleChanges} from '@angular/core';
import {ISpell} from '../../../models/spells.interface';
import {Pagination} from '../../../models/api.interfaces';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-spells-array',
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './spells-array.component.html',
  styleUrl: './spells-array.component.scss'
})
export class SpellsArrayComponent {
  protected readonly Math = Math;

  currentPage: number = 0;
  @Input() isLoading: boolean = false;
  @Input() spells: ISpell[] = [];
  @Input() spellCount: number = 0;
  @Input() pageSize: number = 0;
  @Output() selectedPage: EventEmitter<Pagination> = new EventEmitter<Pagination>();
  @Output() selectedSpell: EventEmitter<ISpell> = new EventEmitter<ISpell>();

  selectASpell(spell: ISpell): void {
    this.selectedSpell.emit(spell);
  }

  selectAPage(page: number): void {
    this.currentPage = page;
    this.selectedPage.emit({offset: page*this.pageSize, limit: this.pageSize});
  }
}
