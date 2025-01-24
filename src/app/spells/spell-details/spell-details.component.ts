import {Component, Input} from '@angular/core';
import {Spell} from '../spells.interface';

@Component({
  selector: 'app-spell-details',
  imports: [],
  template: `
    <div id="spellDetailsComponent">
      @if (spell) {
        <h2>{{spell.name}}</h2>
        <div class="description">
          {{ spell.desc.join("\\n") }}
        </div>
        <div class="stats">
          <h3>Statistics</h3>
          <div class="container">
            <ul>
              <li>School : {{ spell.school.name }}</li>
              <li>Level : {{ spell.level }}</li>
              <li>Casting time : {{ spell.casting_time }}</li>
              <li>Range : {{ spell.range }}</li>
              <li>Duration : {{ spell.duration }}</li>
            </ul>
            <div>

            </div>
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: './spell-details.component.css'
})
export class SpellDetailsComponent {
  @Input() spell: Spell | undefined = undefined;

}
