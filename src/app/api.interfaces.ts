export interface ApiObjectReference {
  index: string,
  name: string,
  url: string,
}

export interface ApiListReference {
  count: number,
  results: ApiObjectReference[]
}

export interface Pagination {
  offset: number,
  limit: number
}
