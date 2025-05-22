export interface DndClassRequestResults {
  index: string,
  name: string,
  url: string
}

export interface DndClassRequest {
  count: number,
  results: DndClassRequestResults[]
}
