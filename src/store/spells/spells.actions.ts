import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {ISpell, ISpellReference} from "@models/spells.interface";
import {ApiObjectReference, Pagination} from '@models/api.interfaces';

export const spellsActions = createActionGroup({
  source: 'Spell',
  events: {
    'Load Spells': emptyProps(),
    'Load Spells From Pagination': props<Pagination>(),
    'Get Spells From Reference': props<{spellReferences: ISpellReference[]}>(),
    'Load Spells Success': props<{spells: ISpell[]}>(),
    'Load Spells Faillure': props<{error: any}>(),
  }
});
