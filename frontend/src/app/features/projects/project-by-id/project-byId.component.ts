import { Component, inject, signal } from '@angular/core';
import { ProjectService } from '../../../core/services/project.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Project } from '../../../core/models/project.model';
import { catchError, finalize, of, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-by-id',
  imports: [CommonModule],
  templateUrl: './project-byId.component.html',
})
export class ProjecById {
  private projectService = inject(ProjectService);
  private route = inject(ActivatedRoute)
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
}
