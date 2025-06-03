import {ApiObject, ApiObjectReference} from '@models/api.interfaces';
import {I_EquipmentWithQuantity} from '@models/class.interface';

export interface I_Equipment extends ApiObject {
    "desc": string[],
    "special": any[],
    "equipment_category": ApiObjectReference,
    "weapon_category": string,
    "weapon_range": string,
    "category_range": string,
    "cost": {
        "quantity": number,
        "unit": T_Unit
    },
    "damage": {
        "damage_dice": string,
        "damage_type": ApiObjectReference,
    },
    "range": {
        "normal": number
    },
    "weight": number,
    "properties": ApiObjectReference[],
    "throw_range": {
        "normal": number,
        "long": number
    },
    "contents": I_EquipmentWithQuantity[],
}

export type T_Unit = 'cp' | 'sp' | 'ep' | 'gp' | 'pp';


