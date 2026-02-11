import { Component, inject, signal } from '@angular/core';
import { ProjectService } from '../../../core/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Project } from '../../../core/models/project.model';
import { CommonModule } from '@angular/common';
import { finalize, switchMap } from 'rxjs';
import { UpdateProject } from '../../../core/models/updateprojet.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-update',
  imports: [CommonModule, FormsModule],
  templateUrl: './project-update.component.html',
})
export class ProjectUpdateComponent {
  model: UpdateProject = {
    projectName: '',
    projectDescription: '',
    endDate: '',
    status: 0,
    actualBudget: 0
  };
  submitting = signal(false);

  private projectService = inject(ProjectService);
  private router= inject(Router);
  private route = inject(ActivatedRoute);

  submit(): void {
    this.submitting.set(true);
    this.route.paramMap.pipe(
      switchMap(params => this.projectService.update(Number(params.get('id')), this.model)),
    finalize(() => this.submitting.set(false))
    ).subscribe( {
      next: () => {
        this.router.navigate(['/projects']);
      }
    });
  }
}
