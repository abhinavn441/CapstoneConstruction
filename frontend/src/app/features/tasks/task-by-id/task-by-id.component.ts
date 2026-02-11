import { Component, inject, signal } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Task } from '../../../core/models/task.model';
import { catchError, finalize, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-task-by-id',
  imports: [],
  templateUrl: './task-by-id.component.html',
  styleUrl: './task-by-id.component.css',
})
export class TaskById {
  private taskService = inject(TaskService);
  private route = inject(ActivatedRoute);
  loading = signal(true);

  task = toSignal<Task | null>(
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.taskService.getById(id).pipe(
          finalize(() => this.loading.set(false)),
          catchError(() => of(null))
        );
      })
    ),
    { initialValue: null }
  )
}
