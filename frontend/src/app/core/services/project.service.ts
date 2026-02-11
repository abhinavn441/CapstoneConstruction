import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { CreateProject } from '../models/createproject.model';
import { UpdateProject } from '../models/updateprojet.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly apiUrl = '/api/projects';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  getById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  create(payload: CreateProject): Observable<void> {
    return this.http.post<void>(this.apiUrl, payload);
  }

  update(id: number, payload: UpdateProject): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
