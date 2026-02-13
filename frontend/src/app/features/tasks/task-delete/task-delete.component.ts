import { Component, inject } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, switchMap } from 'rxjs';
import { NavigationService } from '../../../core/services/nagivation.service';

@Component({
  selector: 'app-task-delete',
  imports: [],
  templateUrl: './task-delete.component.html',
  styleUrl: './task-delete.component.css',
})
export class TaskDelete {
  constructor(
    private taskService:TaskService,
    private navigation: NavigationService
  ) { }

  private route = inject(ActivatedRoute);

  remove(): void {
    this.route.paramMap.pipe(
      switchMap(params => this.taskService.delete(Number(params.get('id'))))
    ).subscribe({
      next: () => {
        this.navigation.navigateToTasks();
      }
    });
  }
}
