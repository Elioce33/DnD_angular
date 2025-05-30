import {createActionGroup, emptyProps, props} from "@ngrx/store";
import { IClass } from "../../models/IClass";
import {ApiObjectReference} from '../../models/api.interfaces';

export const classesActions = createActionGroup({
  source: 'Classe',
  events: {
    'Load Classes': emptyProps(),
    'Load Classes Detail From References': props<{ classes: ApiObjectReference[] }>(),
    'Load Classes Success': props<{classes: IClass[]}>(),
    'Load Classes Faillure': props<{error: any}>(),
  }
});
