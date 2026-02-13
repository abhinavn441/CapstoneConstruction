import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UpdateTask } from '../../../core/models/updatetask.model';
import { TaskService } from '../../../core/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../../core/models/task.model';
import { finalize, switchMap } from 'rxjs';
import { NavigationService } from '../../../core/services/nagivation.service';

@Component({
  selector: 'app-task-update',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-update.component.html',
  styleUrl: './task-update.component.css',
})
export class TaskUpdate {
  model: UpdateTask = {
    taskName: '',
    taskDescription: '',
    status: 0,
    engineerId: 0
  };
  constructor(
    private taskService: TaskService,
    private navigation: NavigationService
  ) { }

  private route = inject(ActivatedRoute);
  submitting = signal(false);
  submit(): void {
    this.submitting.set(true);
    this.route.paramMap.pipe(
      switchMap(params => this.taskService.update(Number(params.get('id')), this.model)),
      finalize(() => this.submitting.set(false))
    ).subscribe({
      next: () => {
        this.navigation.navigateToTasks();
      }
    });
  }
}
