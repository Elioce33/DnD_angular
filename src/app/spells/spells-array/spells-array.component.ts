import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {Spell} from '../spells.interface';

@Component({
  selector: 'app-spells-array',
  imports: [],
  template: `
    @if (!spells) {
      <i>loading spells list</i>
    } @else {
      <table>
        <tr>
          <th>Name</th>
          <th>School</th>
          <th>Level</th>
          <th>Casting time</th>
          <th>Duration</th>
          <th>Need concentration</th>
        </tr>
        @for (spell of spells; track spell.name) {
          <tr (click)="selectASpell(spell)">
            <td>{{spell.name}}</td>
            <td>{{spell.school.name}}</td>
            <td>{{spell.level}}</td>
            <td>{{spell.casting_time}}</td>
            <td>{{spell.duration}}</td>
            <td>{{spell.concentration ? 'yes' : 'no'}}</td>
          </tr>
        }
      </table>
    }
  `,
  styleUrl: './spells-array.component.css'
})
export class SpellsArrayComponent {
  @Input() spells: Spell[] = [];
  @Output() selectedSpell: EventEmitter<Spell> = new EventEmitter<Spell>();

  selectASpell(spell: Spell): void {
    this.selectedSpell.emit(spell);
  }

}
