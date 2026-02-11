import { Component, inject } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, switchMap } from 'rxjs';

@Component({
  selector: 'app-task-delete',
  imports: [],
  templateUrl: './task-delete.component.html',
  styleUrl: './task-delete.component.css',
})
export class TaskDelete {
  private taskService=inject(TaskService);
  private router=inject(Router);
  private route=inject(ActivatedRoute);

  remove(): void {
    this.route.paramMap.pipe(
      switchMap(params => this.taskService.delete(Number(params.get('id'))))
    ).subscribe({
      next: () => {
        this.router.navigate(['/tasks']);
      }
    });
  }
}
