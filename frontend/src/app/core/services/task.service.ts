import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Task } from "../models/task.model";
import { CreateTask } from "../models/createtask.model";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private readonly apiUrl = '/api/taskitem';

    constructor(private http: HttpClient) { }

    getAll(): Observable<Task[]> {
        return this.http.get<Task[]>(this.apiUrl);
    }

    getById(id: number): Observable<Task> {
        return this.http.get<Task>(`${this.apiUrl}/${id}`);
    }

    create(payload: CreateTask): Observable<void> {
        return this.http.post<void>(this.apiUrl, payload);
    }

    update(id: number, payload: any): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${id}`, payload);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
    getByProject(id: number) : Observable<Task[]> {
        return this.http.get<Task[]>(`api/projects/${id}/tasks`);
    }
}
