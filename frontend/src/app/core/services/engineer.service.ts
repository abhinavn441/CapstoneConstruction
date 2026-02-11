import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Engineer } from "../models/engineer.model";
import { EngineerCreate } from "../../features/engineers/engineer-create/engineer-create";
import { CreateEngineer } from "../models/createengineer.model";
import { UpdateEngineer } from "../models/updateengineer.model";

@Injectable({
    providedIn: 'root'
})
export class EngineerService {
    private readonly apiUrl = '/api/engineers';

    constructor(private http: HttpClient) { }

    getAll(): Observable<Engineer[]> {
        return this.http.get<Engineer[]>(this.apiUrl);
    }

    getById(id: number): Observable<Engineer> {
        return this.http.get<Engineer>(`${this.apiUrl}/${id}`);
    }

    create(payload: CreateEngineer): Observable<void> {
        return this.http.post<void>(this.apiUrl, payload);
    }

    update(id: number, payload: UpdateEngineer): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${id}`, payload);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
