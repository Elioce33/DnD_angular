import {inject, Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "./app.tokens";
import {DndClassRequest} from './classes/classes.interface';
import {ClassDetailsInterface} from "./classes/classes-details/class-details.interface";
import {ApiListReference, ApiObjectReference} from './api.interfaces';

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

  getAllReferences<T>(references: ApiObjectReference[]): Observable<T>[] {
    const observables: Observable<T>[] = [];
    references.forEach(reference => {
      observables.push(
        this.http.get<T>(`${this.baseUrl}${reference.url}`)
      );
    });
    return observables;
  }

  getClasses(): Observable<DndClassRequest> {
    return this.get<DndClassRequest>('/api/classes');
  }

  getClassesDetails(index: string): Observable<ClassDetailsInterface> {
    return this.get<ClassDetailsInterface>(`/api/classes/${index}`);
  }

  getSpells(): Observable<ApiObjectReference[]> {
    return this.get<ApiListReference>('/api/spells')
      .pipe( map( (response: ApiListReference) =>  response.results) );
  }

  getProficienciesDetails(index: string): Observable<ClassDetailsInterface> {
    return this.get<ClassDetailsInterface>(`/api/proficiencies/${index}`);
  }
}
