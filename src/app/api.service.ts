import {inject, Injectable} from '@angular/core';
import {map, Observable, zip} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "./app.tokens";
import {ClassDetailsInterface} from "../models/class-details.interface";
import {ApiListReference, ApiObjectReference, Pagination} from '../models/api.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = inject(BASE_URL);

  constructor() { }

  /**
   * Return an observable containing data from @path
   * @param path of the API resource
   */
  get<T>(path: string): Observable<T> {
    return this.http.get(`${this.baseUrl}${path}`) as Observable<T>;
  }

  /**
   * Get details form a list on references, can work with pagination
   * @param references List of reference to other object
   * @param page get only the selected page to
   */
  getAllReferences<T>(references: ApiObjectReference[], page?: Pagination): Observable<T[]> {
    const observables: Observable<T>[] = [];
    if(page) {
      references = references.slice(page.offset, page.offset + page.limit);
    }
    return zip<T[]>(references.map( (reference: ApiObjectReference): Observable<T> => this.get<T>(reference.url) ));
  }

  /**
   * Get all references of spells
   */
  getSpells(): Observable<ApiListReference> {
    return this.get<ApiListReference>('/api/spells');
  }

  /**
   * Get all references of classes
   */
  getClasses(): Observable<ApiListReference> {
    return this.get<ApiListReference>('/api/classes');
  }

  getClassesDetails(index: string): Observable<ClassDetailsInterface> {
    return this.get<ClassDetailsInterface>(`/api/classes/${index}`);
  }

  getProficienciesDetails(index: string): Observable<ClassDetailsInterface> {
    return this.get<ClassDetailsInterface>(`/api/proficiencies/${index}`);
  }
}
