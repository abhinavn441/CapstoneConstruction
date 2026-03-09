import { Component, inject, signal } from '@angular/core';
import { ProjectService } from '../../../core/services/project.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Project } from '../../../core/models/project.model';
import { catchError, finalize, of, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DxDataGridModule, DxButtonModule } from "devextreme-angular";
import { NavigationService } from '../../../core/services/nagivation.service';

@Component({
  selector: 'app-project-by-id',
  imports: [CommonModule, DxDataGridModule, DxButtonModule],
  templateUrl: './project-byId.component.html',
  styleUrl: './project-byId.component.css',
})
export class ProjecById {

  private projectService = inject(ProjectService);
  private route = inject(ActivatedRoute);
  private navigation = inject(NavigationService);

  loading = signal(true);

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
  toProject() {
    this.navigation.navigateToProjects();
  }
  deleteProject() {
    this.route.paramMap.pipe(
      switchMap(params => this.projectService.delete(Number(params.get('id'))))
    ).subscribe({
      next: () => {
        this.navigation.navigateToProjects();
      }
    }); 
  }
}
