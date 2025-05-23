import { createAction, props } from "@ngrx/store";
import { Spell } from "../../app/spells/spells.interface";

export const loadSpells  = createAction( '[Spells] Load Spells');
export const loadSpellsSuccess = createAction( '[Spells] Load Spells Success', props<{spells: Spell[]}>() );
export const loadSpellsEchec = createAction( '[Spells] Load Spells Echec');
