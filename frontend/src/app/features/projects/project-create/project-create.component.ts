import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { CreateProject } from '../../../core/models/createproject.model';
import { finalize } from 'rxjs';
import { NavigationService } from '../../../core/services/nagivation.service';
@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-create.component.html',
})
export class ProjectCreateComponent {

  model: CreateProject = {
    projectName: '',
    projectDescription: '',
    startDate: '',
    status: 0,
    managerId: 0,
    estimatedBudget: 0
  };

  submitting = signal(false);

  constructor(
    private projectService: ProjectService,
    private navigation: NavigationService
  ) { }

  submit(): void {
    this.submitting.set(true);

    this.projectService.create(this.model).pipe(
      finalize(() => this.submitting.set(false))
    ).subscribe({
      next: () => {
        this.navigation.navigateToProjects();
      }
    });
    console.log(this.model);
  }
}
