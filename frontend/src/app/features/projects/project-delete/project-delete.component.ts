import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Project } from '../../../core/models/project.model';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, of, switchMap } from 'rxjs';
import { ProjectService } from '../../../core/services/project.service';

@Component({
  selector: 'app-project-delete',
  imports: [],
  templateUrl: './project-delete.component.html',
  styleUrl: './project-delete.component.css',
})
export class ProjectDelete {
  private projectService = inject(ProjectService);
  private route = inject(ActivatedRoute)
  private router = inject(Router);

  remove(): void {
    this.route.paramMap.pipe(
      switchMap(params => this.projectService.delete(Number(params.get('id'))))
    ).subscribe({
      next: () => {
        this.router.navigate(['/projects']);
      }
    });
  }
}
