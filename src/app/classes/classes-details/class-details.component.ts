import {Component, Input, input} from '@angular/core';
import {ApiService} from '../../api.service';
import {IClass, Proficiencies} from '../../../models/IClass';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-class-details',
    imports: [],
  templateUrl: './class-details.component.html',
  styleUrl: './class-details.component.scss'
})
export class ClassDetailsComponent {
    @Input() classIndex!: string;
    classDetails: IClass | undefined;
    selectedSpell: {name: string, desc:string[]} | undefined;
    selectedProficiency: Proficiencies | undefined;
    classColor: string = '#FFF';

    constructor(private api: ApiService) {}

    ngOnChanges(): void {
        if(this.classIndex) {
            this.api.getClassesDetails(this.classIndex).subscribe(response => {
                this.classDetails = response;
                this.selectedSpell = undefined;
                this.selectedProficiency = undefined;

                console.log(JSON.stringify(response));

                // TO set "random" color based on the class name
                this.classColor = this.stringToColour(this.classDetails.name);
            });
        }
    }

  spellDetails(spellInfo: {name: string, desc:string[]}): void {
    this.selectedSpell = spellInfo;
  }

  proficiencyDetails(proficiency: Proficiencies): void {
    this.selectedProficiency = proficiency;
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
