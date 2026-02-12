import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class BaseApiService<TRead, TCreate, TUpdate> {
    constructor (
        protected http: HttpClient,
        protected endpoint: string
    ) {}

    getAll(): Observable<TRead[]> {
        return this.http.get<TRead[]>(this.endpoint);
      }
    
      getById(id: number): Observable<TRead> {
        return this.http.get<TRead>(`${this.endpoint}/${id}`);
      }
    
      create(payload: TCreate): Observable<void> {
        return this.http.post<void>(this.endpoint, payload);
      }
    
      update(id: number, payload: TUpdate): Observable<void> {
        return this.http.put<void>(`${this.endpoint}/${id}`, payload);
      }
    
      delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.endpoint}/${id}`);
      }
} 