import {inject, Injectable} from '@angular/core';
import {map, Observable, zip} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "./app.tokens";
import {DndClassRequest} from './classes/classes.interface';
import {ClassDetailsInterface} from "./classes/classes-details/class-details.interface";
import {ApiListReference, ApiObjectReference, Pagination} from './api.interfaces';
import {Spell} from './spells/spells.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = inject(BASE_URL);

  constructor() { }

  get<T>(path: string): Observable<T> {
    return this.http.get(`${this.baseUrl}${path}`) as Observable<T>;
  }

  getAllReferences<T>(references: ApiObjectReference[], page?: Pagination): Observable<T[]> {
    const observables: Observable<T>[] = [];
    if(page) {
      references = references.slice(page.offset, page.offset + page.limit);
    }
    return zip<T[]>(references.map( (reference: ApiObjectReference): Observable<T> => this.get<T>(reference.url) ));
  }

  getClasses(): Observable<DndClassRequest> {
    return this.get<DndClassRequest>('/api/classes');
  }

  getClassesDetails(index: string): Observable<ClassDetailsInterface> {
    return this.get<ClassDetailsInterface>(`/api/classes/${index}`);
  }

  getSpells(): Observable<ApiListReference<Spell>> {
    return this.get<ApiListReference<Spell>>('/api/spells');
  }

  getProficienciesDetails(index: string): Observable<ClassDetailsInterface> {
    return this.get<ClassDetailsInterface>(`/api/proficiencies/${index}`);
  }
}
