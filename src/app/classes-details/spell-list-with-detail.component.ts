import {Component, Input} from '@angular/core';
import {ApiObjectReference} from '../api.interfaces';
import {Spells} from '../spells/spells.interfaces';
import {ApiService} from '../api.service';


@Component({
  selector: 'app-spells-list-with-detail',
  imports: [],
  template: `
    <div class="spellcasting">
      <h3>Spell casting </h3>
      <div class="container">
        <div class="list">
          <ul>
            @for (spell of spellList; track spell.name) {
              <li>
                <a class="clickable" (click)="spellDetails(spell)">{{ spell.name }}</a>
              </li>
            }
          </ul>
        </div>
        <div class="details">
          @if (!selectedSpell) {
            <div>Select a spell to show description</div>
          } @else {
            <h4>{{ selectedSpell.name }}</h4>
            <div>
              <ul>
                <li>Range : {{ selectedSpell.range }}</li>
                <li>Duration : {{ selectedSpell.duration }}</li>
                <li>Casting time : {{ selectedSpell.casting_time }}</li>
                <li>Level : {{ selectedSpell.level }}</li>
                <li>Scool : {{ selectedSpell.school.name }}</li>
              </ul>
            </div>
            <div class="description">
              <b>Description</b> <br>
              {{ selectedSpell.desc.join("\\n") }}
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styleUrl: './list-with-detail.component.css'
})
export class SpellListWithDetailComponent {
  @Input() spellList: any[] | undefined = [];
  selectedSpell: Spells | undefined;


  constructor(private api: ApiService) {}

  spellDetails(spellInfo: ApiObjectReference): void {
    this.api.get<Spells>(spellInfo.url).subscribe(response => {
      this.selectedSpell = response;
    });
  }
}
