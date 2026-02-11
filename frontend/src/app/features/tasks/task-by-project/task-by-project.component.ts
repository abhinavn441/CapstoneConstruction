import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Task } from '../../../core/models/task.model';
import { catchError, finalize, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-task-by-project',
  imports: [],
  templateUrl: './task-by-project.component.html',
  styleUrl: './task-by-project.component.css',
})
export class TaskByProject {
private taskService = inject(TaskService);
  private route = inject(ActivatedRoute);
  loading = signal(true);

  tasks = toSignal<Task[] | null>(
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.taskService.getByProject(id).pipe(
          finalize(() => this.loading.set(false)),
          catchError(() => of([]))
        );
      })
    ),
    { initialValue: null }
  )
}

