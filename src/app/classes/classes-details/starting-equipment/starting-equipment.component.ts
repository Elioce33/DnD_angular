import {Component, Input, OnInit} from '@angular/core';
import {I_EquipmentWithQuantity} from '@models/class.interface';
import {ApiService} from '../../../api.service';
import {I_Equipment} from '@models/equipment.interface';
import {EquipmentComponent} from '../equipment/equipment.component';

@Component({
  selector: 'app-starting-equipment',
    imports: [
        EquipmentComponent
    ],
  templateUrl: './starting-equipment.component.html',
  styleUrl: './starting-equipment.component.scss'
})
export class StartingEquipmentComponent {
    @Input() starting_equipment: I_EquipmentWithQuantity[] = [];
    loading = true;

    constructor(private api: ApiService) {}


    ngOnChanges() {
        this.loading = true;

        const equipments$ = this.api.getAllReferences<I_Equipment>( this.starting_equipment.map(e => e.equipment) );

        equipments$.subscribe( (equipments: I_Equipment[]) => {
            this.starting_equipment = this.starting_equipment?.map(startingEquipment => {
                const updatedEquipment = equipments.filter(e => e.index === startingEquipment.equipment.index);
                return {
                    ...startingEquipment,
                    equipment: updatedEquipment[0]
                };
            });
            this.loading = false;
        })
    }
}
