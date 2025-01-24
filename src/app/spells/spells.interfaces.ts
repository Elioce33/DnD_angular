import {ApiObjectReference} from '../api.interfaces';

export interface Spells {

  index: string,
  name: string,
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
  url: string,
  updated_at: Date

}
