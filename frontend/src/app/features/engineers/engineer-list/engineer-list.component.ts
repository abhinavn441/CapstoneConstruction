import { Component, effect, inject, signal } from '@angular/core';
import { EngineerService } from '../../../core/services/engineer.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Engineer } from '../../../core/models/engineer.model';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular'
import { NavigationService } from '../../../core/services/nagivation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-engineer-list',
  imports: [DxDataGridModule, DxButtonModule],
  templateUrl: './engineer-list.component.html',
  styleUrl: './engineer-list.component.css',
})
export class EngineerList {
  private engineerService = inject(EngineerService);

  loading = signal(true);
  engineers = signal<Engineer[]>([]);
  selectedKeys = signal<number[]>([]);

  constructor(
    private navigation: NavigationService,
    private router: Router
  ) {
    this.loadEngineers();
    effect(() =>
      (console.log(this.engineers())));
  }
  private loadEngineers() {
    this.loading.set(true);
    this.engineerService.getAll().pipe(
      finalize(() => this.loading.set(false)),
      catchError(() => of([]))
    ).subscribe(data => {
      this.engineers.set(data);
    });
  }

  deleteSelected() {
    const ids = this.selectedKeys();
    if (!ids || ids.length === 0) return;
    forkJoin(ids.map((id) => this.engineerService.delete(id)
      .pipe(catchError(() => of(null)))))
      .pipe(finalize(() => this.refresh()))
      .subscribe();
  }

  updateSelected() {
    const id = this.selectedKeys()[0];
    if (!id) return;
    this.router.navigate(['/engineers/update', id]);
  }

  private refresh() {
    this.loadEngineers();
    this.selectedKeys.set([]);
  }
  back() {
    this.navigation.navigateToMenu();
  }
  toCreateEngineers() {
    this.router.navigate(['/engineers/create']);
    console.log(this.router.url);
  }

  onSelectionChanged(e: any) {
    console.log('selection keys', e.selectedRowKeys);
    this.selectedKeys.set(e.selectedRowKeys || []);
  }
} 
