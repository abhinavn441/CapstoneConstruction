import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Task } from "../models/task.model";
import { CreateTask } from "../models/createtask.model";
import { BaseApiService } from "./baseapi.service";
import { UpdateTask } from "../models/updatetask.model";

@Injectable({
    providedIn: 'root'
})
export class TaskService extends BaseApiService<Task, CreateTask, UpdateTask> {
    private readonly apiUrl = '/api/taskitem';

    constructor(http: HttpClient) {
        super(http, '/api/taskitem')
    }
    
    getByProject(id: number): Observable<Task[]> {
        return this.http.get<Task[]>(`api/projects/${id}/tasks`);
    }
}
