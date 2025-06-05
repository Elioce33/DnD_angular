import {ApiObject, ApiObjectReference, Url} from './api.interfaces';
import {I_Equipment} from '@models/equipment.interface';

export interface IClass extends ApiObject {
    hit_die?: number
    class_levels?: Url
    multi_classing?: I_MultiClassing
    subclasses?: ApiObjectReference[]

    spells?: Url
    spellcasting?: I_SpellCasting

    proficiency_choices?: I_ProficiencyChoices[]
    proficiencies?: ApiObjectReference[]
    saving_throws?: ApiObjectReference[]

    starting_equipment?: I_EquipmentWithQuantity[]
    starting_equipment_options ?: T_StartingEquipmentOptions[]
}

interface I_SpellCasting {
    level: number
    spellcasting_ability?: ApiObjectReference
    info: ObjectDescription[]
}

export interface I_ProficiencyChoices extends Choices {
    from: I_ProficiencyChoicesOptionFrom
}

interface I_ProficiencyChoicesOptionFrom extends OptionArray {
    options: (OptionReference | OptionChoice)[]
}

export interface I_EquipmentWithQuantity {
    equipment: I_Equipment
    quantity: number
}

interface I_MultiClassing {
    prerequisite_options: Choices
    prerequisites: I_AbilityPrerequisites[]
    proficiencies: ApiObjectReference[]
}

interface I_AbilityPrerequisites {
    ability_score: ApiObjectReference
    minimum_score: number
}

export type T_StartingEquipmentOptions = Choices;



// ---------- Common interfaces ----------
interface ObjectDescription {
    name: string
    desc: string
}

interface Choices {
    desc: string,
    choose: number,
    type: string | 'proficiencies' | 'equipment',
    from: OptionArray | EquipmentCategory
}

enum E_OptionSet {
    ARRAY = 'options_array',
    EQUIPMENT = 'equipment_category',
}

interface OptionSet<T extends E_OptionSet> {
    option_set_type: T
}

interface EquipmentCategory extends OptionSet<E_OptionSet.EQUIPMENT> {
    equipment_category: ApiObjectReference
}

export interface OptionArray extends OptionSet<E_OptionSet.ARRAY> {
    options: (OptionReference | OptionCountedReference | OptionChoice | OptionMultiple)[]
}

enum E_OptionType {
    REFERENCE = 'reference',
    COUNTED = 'counted_reference',
    CHOICE = 'choice',
    MULTIPLE =  'multiple',
}

interface OptionType<T extends E_OptionType> {
    option_type: T
}

interface OptionReference extends OptionType<E_OptionType.REFERENCE> {
    item: ApiObjectReference
}

interface OptionCountedReference extends OptionType<E_OptionType.COUNTED> {
    count: number,
    of: ApiObjectReference
}

interface OptionChoice extends OptionType<E_OptionType.CHOICE> {
    choice: Choices
}

interface OptionMultiple extends OptionType<E_OptionType.MULTIPLE> {
    items: OptionType<E_OptionType>[]
}
