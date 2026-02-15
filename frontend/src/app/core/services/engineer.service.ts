import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Engineer } from "../models/engineer.model";
import { CreateEngineer } from "../models/createengineer.model";
import { UpdateEngineer } from "../models/updateengineer.model";
import { BaseApiService } from "./baseapi.service";

@Injectable({
    providedIn: 'root'
})
export class EngineerService extends BaseApiService<Engineer, CreateEngineer, UpdateEngineer> {
    
    constructor(http: HttpClient) {
        super(http, '/api/engineers');
    }
}
