import {Component, Input} from '@angular/core';
import {I_ProficiencyChoices} from '@models/class.interface'

@Component({
  selector: 'app-proficiency-choices',
  imports: [],
  templateUrl: './proficiency-choices.component.html',
  styleUrl: './proficiency-choices.component.scss'
})  
export class ProficiencyChoicesComponent {
    @Input() proficiency_choices: I_ProficiencyChoices[] | undefined;
}
