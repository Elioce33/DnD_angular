import {Component, Input} from '@angular/core';
import {ISpell} from '../../../models/spells.interface';

@Component({
  selector: 'app-spell-details',
  imports: [],
  templateUrl: './spell-details.component.html',
  styleUrl: './spell-details.component.scss'
})
export class SpellDetailsComponent {
  @Input() spell: ISpell | undefined = undefined;

}
