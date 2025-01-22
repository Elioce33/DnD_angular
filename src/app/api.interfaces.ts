export interface ApiObjectReference {
  index: string,
  name: string,
  url: string,
}

export interface ApiListReference {
  count: number,
  results: ApiObjectReference[]
}
