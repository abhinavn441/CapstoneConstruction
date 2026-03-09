import { Component, effect, inject, signal } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Task } from '../../../core/models/task.model';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import { NavigationService } from '../../../core/services/nagivation.service';
import { Router } from '@angular/router';
import { DxDataGridModule, DxButtonModule } from "devextreme-angular";

@Component({
  selector: 'app-task-list',
  imports: [DxDataGridModule, DxButtonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskList {
  private taskService = inject(TaskService);

  loading = signal(true);
  tasks = signal<Task[]>([]);
  selectedKeys = signal<number[]>([]);

  constructor(
    private navigation: NavigationService,
    private router: Router
  ) {
    this.loadtasks();
    effect(() =>
      (console.log(this.tasks())));
  }
  private loadtasks() {
    this.loading.set(true);
    this.taskService.getAll().pipe(
      finalize(() => this.loading.set(false)),
      catchError(() => of([]))
    ).subscribe(data => {
      this.tasks.set(data);
    });
  }

  deleteSelected() {
    const ids = this.selectedKeys();
    if (!ids || ids.length === 0) return;
    forkJoin(ids.map((id) => this.taskService.delete(id)
      .pipe(catchError(() => of(null)))))
      .pipe(finalize(() => this.refresh()))
      .subscribe();
  }
  private refresh() {
    this.loadtasks();
    this.selectedKeys.set([]);
  }
  back() {
    this.navigation.navigateToMenu();
  }
  toCreateEngineers() {
    this.router.navigate(['/tasks/create']);
    console.log(this.router.url);
  }

  onSelectionChanged(e: any) {
    console.log('selection Keys', e.selectedRowKeys);
    this.selectedKeys.set(e.selectedRowKeys);
  }

  updtaeSelected() {
    const id= this.selectedKeys()[0];
    if (!id) return;
    this.router.navigate(['/tasks/update', id]);
  }

}
