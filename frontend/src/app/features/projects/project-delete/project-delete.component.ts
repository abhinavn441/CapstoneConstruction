import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Project } from '../../../core/models/project.model';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, of, switchMap } from 'rxjs';
import { ProjectService } from '../../../core/services/project.service';
import { NavigationService } from '../../../core/services/nagivation.service';

@Component({
  selector: 'app-project-delete',
  imports: [],
  templateUrl: './project-delete.component.html',
  styleUrl: './project-delete.component.css',
})
export class ProjectDelete {
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private navigation: NavigationService
  ) { }

  remove(): void {
    this.route.paramMap.pipe(
      switchMap(params => this.projectService.delete(Number(params.get('id'))))
    ).subscribe({
      next: () => {
        this.navigation.navigateToProjects();
      }
    });
  }
}
