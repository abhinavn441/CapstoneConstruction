import { Component, effect, inject, signal } from '@angular/core';
import { ProjectService } from '../../../core/services/project.service';
import { Project } from '../../../core/models/project.model';
import { finalize, catchError, of, forkJoin } from 'rxjs';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
import { NavigationService } from '../../../core/services/nagivation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  imports: [DxDataGridModule, DxButtonModule],
  standalone: true,
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent {
  private projectService = inject(ProjectService);

  loading = signal(true);
  projects = signal<Project[]>([]);
  selectedKeys = signal<number[]>([]);

  constructor(
    private navigation: NavigationService,
    private router: Router
  ) {
    this.loadProjects();
    effect(() =>
      (console.log(this.projects())));
  }

  statusOptions = [
    { id: 0, name: 'Planned' },
    { id: 1, name: 'In Progress' },
    { id: 2, name: 'On Hold' },
    { id: 3, name: 'Completed' },
    { id: 4, name: 'Cancelled' }
  ]

  private loadProjects() {
    this.loading.set(true);
    this.projectService.getAll().pipe(
      finalize(() => this.loading.set(false)),
      catchError(() => of([]))
    ).subscribe(data => {
      this.projects.set(data);
    });
  }

  deleteSelected() {
    const ids = this.selectedKeys();
    if (!ids || ids.length === 0) return;
    forkJoin(ids.map((id) => this.projectService.delete(id)
      .pipe(catchError(() => of(null)))))
      .pipe(finalize(() => this.refresh()))
      .subscribe();
  }

  updateSelected() {
    const id= this.selectedKeys()[0];
    if (!id) return;
    this.router.navigate(['/projects/update', id]);
  }

  private refresh() {
    this.loadProjects();
    this.selectedKeys.set([]);
  }

  back() {
    this.navigation.navigateToMenu();
  }

  toCreateProjects() {
    this.router.navigate(['/projects/create']);
    console.log(this.router.url);
  }

  onSelectionChanged(e: any) {
    console.log('selection keys', e.selectedRowKeys);
    this.selectedKeys.set(e.selectedRowKeys || []);
  }
}
