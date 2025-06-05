import {Component, Input} from '@angular/core';
import {IClass} from '@models/class.interface';
import {StartingEquipmentComponent} from './starting-equipment/starting-equipment.component';
import {StartingEquipmentOptionComponent} from './starting-equipment-option/starting-equipment-option.component';
import {ISpellReference} from '@models/spells.interface';
import {Observable} from 'rxjs';
import {ApiService} from '../../api.service';
import {ApiListReference, ApiObjectReference} from '@models/api.interfaces';
import {Store} from '@ngrx/store';
import {ClassSpellListComponent} from './class-spell-list/class-spell-list.component';
import { ProficiencyChoicesComponent } from './proficiency-choices/proficiency-choices.component';


@Component({
  selector: 'app-class-details',
    imports: [
        StartingEquipmentComponent,
        StartingEquipmentOptionComponent,
        ClassSpellListComponent,
        ProficiencyChoicesComponent
    ],
  templateUrl: './class-details.component.html',
  styleUrl: './class-details.component.scss'
})
export class ClassDetailsComponent {
    @Input() classDetails: IClass | undefined;
    classColor: string = '#FFF';
    spellList$: Observable<ApiListReference> = new Observable();
    spellReferences: ISpellReference[] = [];

    constructor(private api: ApiService, private store: Store) {}

    ngOnChanges(): void {
        if(this.classDetails) {
            if(this.classDetails.spells) {
                this.spellList$ = this.api.get<ApiListReference>(this.classDetails.spells);
                this.spellList$.subscribe( (spellList: ApiListReference) => {
                   this.spellReferences = spellList.results as ISpellReference[];
                });
            }

            this.classColor = this.stringToColour(this.classDetails.name);
        }
    }

    /**
     * This function return a Hex value converted from the HASH of the string
     * @param str initial string
     * @private
     * @return a color in Hex format
     */
    private stringToColour(str: string): string {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        let colour = '#';
        for (let i = 0; i < 3; i++) {
            let value = (hash >> (i * 8)) & 0xFF;
            colour += ( '00' + value.toString(16) ).slice(-2);
        }
        return colour;
    }

}
