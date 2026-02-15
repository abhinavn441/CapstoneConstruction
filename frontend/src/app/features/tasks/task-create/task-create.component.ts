import { Component, signal } from '@angular/core';
import { CreateTask } from '../../../core/models/createtask.model';
import { TaskService } from '../../../core/services/task.service';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationService } from '../../../core/services/nagivation.service';

@Component({
  selector: 'app-task-create',
  imports: [CommonModule, FormsModule],
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
    private navigation: NavigationService
  ) {}

  submit(): void {
    this.submitting.set(true);

    this.taskservice.create(this.model).pipe(
      finalize(() => this.submitting.set(false))
    ).subscribe({
      next: () => {
        this.navigation.navigateToTasks();
      }
    });
    console.log(this.model);
  }
}