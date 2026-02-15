import { Component, inject, signal } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Task } from '../../../core/models/task.model';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskList {
  private taskService = inject(TaskService);
  
  loading = signal(true);
  
  tasks = toSignal<Task[]>(
    this.taskService.getAll().pipe(
      finalize(() => this.loading.set(false)),
      catchError(() => of([]))
    )
  );
}
