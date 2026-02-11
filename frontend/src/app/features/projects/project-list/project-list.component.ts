import { Component, inject, signal } from '@angular/core';
import { ProjectService } from '../../../core/services/project.service';
import { Project } from '../../../core/models/project.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { finalize, catchError, of } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project-list',
  imports: [DatePipe],
  standalone: true,
  templateUrl: './project-list.component.html',
})
export class ProjectListComponent {
  private projectService = inject(ProjectService);
  loading = signal(true);

  projects = toSignal<Project[]>(
    this.projectService.getAll().pipe(
      finalize(() => this.loading.set(false)),
      catchError(() => of([]))
    )
  );
}
