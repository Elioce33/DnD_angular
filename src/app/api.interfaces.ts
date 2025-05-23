export interface ApiObjectReference {
  index: string,
  name: string,
  url: string,
}

export interface ApiListReference<T> {
  count: number,
  results: T[]
}

export interface Pagination {
  offset: number,
  limit: number
}
