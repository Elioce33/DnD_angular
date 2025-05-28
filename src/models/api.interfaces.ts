export interface ApiObject extends ApiObjectReference{
    updated_at: Date
}


export interface ApiObjectReference {
  index: string,
  name: string,
  url: Url,
}

export interface ApiListReference {
  count: number,
  results: ApiObjectReference[]
}

export interface Pagination {
  offset: number,
  limit: number
}

export type Url = string;
