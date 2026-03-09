import { Component, signal } from '@angular/core';
import { CreateTask } from '../../../core/models/createtask.model';
import { TaskService } from '../../../core/services/task.service';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationService } from '../../../core/services/nagivation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DxTextBoxModule, DxNumberBoxComponent, DxSelectBoxModule, DxButtonModule } from "devextreme-angular";

@Component({
  selector: 'app-task-create',
  imports: [CommonModule, FormsModule, DxTextBoxModule, DxNumberBoxComponent, DxSelectBoxModule, DxButtonModule],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css',
})
export class TaskCreate {
  model: CreateTask = {
    taskName: '',
    taskDescription: '',
    status: 0,
    projectId: 0,
    engineerId: 0
  };
  submitting = signal(false);

  constructor(
    private taskservice: TaskService,
    private navigation: NavigationService,
    private snackbar: MatSnackBar
  ) {}
statusOptions = [
    {id: 0, name: 'Planned'},
    {id: 1, name: 'In Progress'},
    {id: 2, name: 'On Hold'},
    {id: 3, name: 'Completed'},
    {id: 4, name: 'Cancelled'}
]
  submit(): void {
    this.submitting.set(true);

    this.taskservice.create(this.model).pipe(
      finalize(() => this.submitting.set(false)),
      
    ).subscribe({
      next: () => {
        this.snackbar.open('Task created', 'Dismiss', {
          duration: 2000
        });
        this.navigation.navigateToTasks();
      }
    });
    console.log(this.model);
  }
  back() {
    this.navigation.navigateToTasks();
  }
  onEngineerIdChanged(e: any) {
    const value = e.value;
    this.model.engineerId = value === null ? null : value;
  }
}