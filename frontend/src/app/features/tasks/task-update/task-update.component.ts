import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UpdateTask } from '../../../core/models/updatetask.model';
import { TaskService } from '../../../core/services/task.service';
import { ActivatedRoute } from '@angular/router';
import { finalize, switchMap } from 'rxjs';
import { NavigationService } from '../../../core/services/nagivation.service';
import { Task } from '../../../core/models/task.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { DxTextBoxModule, DxNumberBoxModule, DxSelectBoxModule, DxButtonModule } from "devextreme-angular";
import { ValueChangedEvent } from 'devextreme/ui/number_box';

@Component({
  selector: 'app-task-update',
  imports: [CommonModule, FormsModule, DxTextBoxModule, DxNumberBoxModule, DxSelectBoxModule, DxButtonModule],
  templateUrl: './task-update.component.html',
  styleUrl: './task-update.component.css',
})
export class TaskUpdate {
  model: UpdateTask = {
    taskName: '',
    taskDescription: '',
    status: 0,
    engineerId: null
  };

  submitting = signal(false);
  private taskService = inject(TaskService);
  private navigation = inject(NavigationService);
  private route = inject(ActivatedRoute);

  statusOptions = [
    { id: 0, name: 'Planned' },
    { id: 1, name: 'In Progress' },
    { id: 2, name: 'On Hold' },
    { id: 3, name: 'Completed' },
    { id: 4, name: 'Cancelled' }
  ]

  task = toSignal<Task | null>(
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.taskService.getById(id);
      })
    )
  );
  constructor() {
    effect(() => {
      const taskData = this.task();
      if (taskData) {
        this.model = {
          taskName: taskData.taskName,
          taskDescription: taskData.taskDescription,
          status: taskData.status,
          engineerId: taskData.engineerId || null
        };
      }
    })
  }

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
  back() {
    this.navigation.navigateToTasks();
  }
  onEngineerIdChanged(e: any) {
    const value = e.value;
    this.model.engineerId = value === null ? null : value;
  }
}
