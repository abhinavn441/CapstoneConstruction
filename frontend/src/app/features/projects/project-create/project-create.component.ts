import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../../core/services/project.service';
import { CreateProject } from '../../../core/models/createproject.model';
import { finalize } from 'rxjs';
import { NavigationService } from '../../../core/services/nagivation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DxTextBoxModule, DxTextAreaModule, DxSelectBoxModule, DxButtonModule, DxNumberBoxModule } from 'devextreme-angular';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { DxiValidationRuleModule } from "devextreme-angular/ui/nested";
@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [CommonModule, FormsModule, DxTextBoxModule, DxTextAreaModule, DxSelectBoxModule, DxButtonModule, DxNumberBoxModule, DxDateBoxModule, DxiValidationRuleModule],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css',
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

  millisecondsInDay = 24 * 60 * 60 * 1000;
  dateValue = new Date().getTime();

  submitting = signal(false);
  statusOptions = [
    { id: 0, name: 'Planned' },
    { id: 1, name: 'In Progress' },
    { id: 2, name: 'On Hold' },
    { id: 3, name: 'Completed' },
    { id: 4, name: 'Cancelled' }
  ]

  constructor(
    private projectService: ProjectService,
    private navigation: NavigationService,
    private snackbar: MatSnackBar
  ) { }

  back() {
    this.navigation.navigateToProjects();
  }
  submit(): void {
    this.submitting.set(true);

    this.projectService.create(this.model).pipe(
      finalize(() => this.submitting.set(false))
    ).subscribe({
      next: () => {
        this.snackbar.open('Project created', 'Dismiss', {
          duration: 2000
        });
        this.navigation.navigateToProjects();
      }
    });
    console.log(this.model);
  }

  todayButton: DxButtonTypes.Properties = {
    text: 'Today',
    stylingMode: 'text',
    onClick: () => {
      this.dateValue = new Date().getTime();
    },
  };

  prevDateButton: DxButtonTypes.Properties = {
    icon: 'spinprev',
    stylingMode: 'text',
    onClick: () => {
      this.dateValue -= this.millisecondsInDay;
    },
  };

  nextDateButton: DxButtonTypes.Properties = {
    icon: 'spinnext',
    stylingMode: 'text',
    onClick: () => {
      this.dateValue += this.millisecondsInDay;
    },
  };
}
