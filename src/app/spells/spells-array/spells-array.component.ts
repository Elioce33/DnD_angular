import {Component, EventEmitter, Inject, Input, Output, SimpleChanges} from '@angular/core';
import {Spell} from '../spells.interface';
import {Pagination} from '../../api.interfaces';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-spells-array',
  imports: [
    NgForOf,
    NgClass
  ],
  template: `
    <div id="spellArrayComponent">
      @if (!spells) {
        <i>loading spells list</i>
      } @else {
        <table>
          <tr>
            <th>Name</th>
            <th>School</th>
            <th>Level</th>
<!--            <th>Casting time</th>-->
<!--            <th>Duration</th>-->
            <th>Need concentration</th>
          </tr>
          <tbody>
            @for (spell of spells; track spell.name) {
              <tr (click)="selectASpell(spell)">
                <td>{{ spell.name }}</td>
                <td>{{ spell.school.name }}</td>
                <td>{{ spell.level }}</td>
<!--                <td>{{ spell.casting_time }}</td>-->
<!--                <td>{{ spell.duration }}</td>-->
                <td>{{ spell.concentration ? 'yes' : 'no' }}</td>
              </tr>
            }
          </tbody>
        </table>
        <div class="paginationSelector">
          <p>
            <span>Total spells : {{spellCount}}</span> |
            <span>Page size : {{this.pageSize}}</span> |
            <span>Total pages : {{Math.ceil(spellCount / this.pageSize)}}</span>
          </p>
          <button *ngFor="let item of [].constructor(Math.ceil(spellCount / this.pageSize)); let i = index"
                  (click)="selectAPage(i)"
                  [ngClass]="{selectedPage : i === currentPage}" class="pageButton">
            {{ i + 1 }}
          </button>
        </div>
      }
    </div>
  `,
  styleUrl: './spells-array.component.css'
})
export class SpellsArrayComponent {
  protected readonly Math = Math;

  currentPage: number = 0;
  @Input() spells: Spell[] = [];
  @Input() spellCount: number = 0;
  @Input() pageSize: number = 0;
  @Output() selectedPage: EventEmitter<Pagination> = new EventEmitter<Pagination>();
  @Output() selectedSpell: EventEmitter<Spell> = new EventEmitter<Spell>();

  selectASpell(spell: Spell): void {
    this.selectedSpell.emit(spell);
  }

  selectAPage(page: number): void {
    this.currentPage = page;
    this.selectedPage.emit({offset: page*this.pageSize, limit: this.pageSize});
  }
}
