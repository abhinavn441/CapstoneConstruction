import { Component, inject, signal } from '@angular/core';
import { CreateTask } from '../../../core/models/createtask.model';
import { TaskService } from '../../../core/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  private taskservice=inject(TaskService);
  private router=inject(Router);
  submitting=signal(false);

  submit() : void {
    this.submitting.set(true);

    this.taskservice.create(this.model).pipe(
      finalize(() => this.submitting.set(false))
    ).subscribe({
      next: () => {
        this.router.navigate(['/tasks']);
      }
    });
    console.log(this.model);
  }
}