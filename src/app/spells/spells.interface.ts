import {ApiObjectReference} from '../api.interfaces';

export interface Spell extends ApiObjectReference{
  desc: string[],
  higher_level: string[],
  range: string,
  components: string[],
  ritual: boolean,
  duration: string;
  concentration: boolean,
  casting_time: string,
  level: number,
  dc: {
    dc_type: ApiObjectReference,
    dc_success: string,
    desc: string
  },
  school: ApiObjectReference,
  classes: ApiObjectReference[],
  subclasses: ApiObjectReference[],
  updated_at: Date
}
