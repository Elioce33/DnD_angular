import {Component, Input} from '@angular/core';
import {IClass} from '../../../models/IClass';

@Component({
  selector: 'app-class-details',
    imports: [],
  templateUrl: './class-details.component.html',
  styleUrl: './class-details.component.scss'
})
export class ClassDetailsComponent {
    @Input() classDetails: IClass | undefined;
    classColor: string = '#FFF';

    ngOnChanges(): void {
        if(this.classDetails) {
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
