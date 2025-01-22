import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "./app.tokens";
import { DndClassRequest } from './classes/classes.interface';
import {ClassDetailsInterface} from "./classes-details/class-details.interface";

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

  getClasses(): Observable<DndClassRequest> {
    return this.get<DndClassRequest>('/api/classes');
  }

  getClassesDetails(index: string): Observable<ClassDetailsInterface> {
    return this.get<ClassDetailsInterface>(`/api/classes/${index}`);
  }

  getProficienciesDetails(index: string): Observable<ClassDetailsInterface> {
    return this.get<ClassDetailsInterface>(`/api/proficiencies/${index}`);
  }
}
