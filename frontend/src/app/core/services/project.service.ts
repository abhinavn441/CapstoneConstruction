import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';
import { CreateProject } from '../models/createproject.model';
import { UpdateProject } from '../models/updateprojet.model';
import { BaseApiService } from './baseapi.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseApiService<Project, CreateProject, UpdateProject> {

  constructor(http: HttpClient) {
    super(http, '/api/projects');
  }
}
