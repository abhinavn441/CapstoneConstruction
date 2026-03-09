import { Component, inject, signal, effect } from '@angular/core';
import { ProjectService } from '../../../core/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Project } from '../../../core/models/project.model';
import { CommonModule } from '@angular/common';
import { catchError, finalize, of, switchMap } from 'rxjs';
import { UpdateProject } from '../../../core/models/updateprojet.model';
import { FormsModule } from '@angular/forms';
import { NavigationService } from '../../../core/services/nagivation.service';
import { DxTextBoxModule, DxDateBoxModule, DxSelectBoxModule, DxNumberBoxModule, DxButtonModule } from "devextreme-angular";

@Component({
  selector: 'app-project-update',
  imports: [CommonModule, FormsModule, DxTextBoxModule, DxDateBoxModule, DxSelectBoxModule, DxNumberBoxModule, DxButtonModule],
  templateUrl: './project-update.component.html',
})
export class ProjectUpdateComponent {
  private projectService = inject(ProjectService);
  private route = inject(ActivatedRoute);
  private navigation = inject(NavigationService);
  submitting = signal(false);
  loading = signal(true);

  statusOptions = [
    { id: 0, name: 'Planned' },
    { id: 1, name: 'In Progress' },
    { id: 2, name: 'On Hold' },
    { id: 3, name: 'Completed' },
    { id: 4, name: 'Cancelled' }
  ]

  project = toSignal<Project | null>(
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.projectService.getById(id).pipe(
          finalize(() => this.loading.set(false)),
          catchError(() => of(null))
        );
      })
    ),
    { initialValue: null }
  );


  model: UpdateProject = {
    projectName: '',
    projectDescription: '',
    endDate: '',
    status: 0,
    actualCost: 0
  };

  constructor() {
    effect(() => {
      const projectData = this.project();
      if (projectData) {
        this.model = {
          projectName: projectData.projectName,
          projectDescription: projectData.projectDescription,
          endDate: projectData.endDate || '',
          status: projectData.status,
          actualCost: projectData.actualCost || 0
        };
      }
    });
  }

  submit(): void {
    this.submitting.set(true);
    this.route.paramMap.pipe(
      switchMap(params => this.projectService.update(Number(params.get('id')), this.model)),
      finalize(() => this.submitting.set(false))
    ).subscribe({
      next: () => {
        this.navigation.navigateToProjects();
      }
    });
  }

  back() {
    this.navigation.navigateToProjects();
  }

}
