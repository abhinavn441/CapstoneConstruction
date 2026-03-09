import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { EngineerService } from '../../../core/services/engineer.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Engineer } from '../../../core/models/engineer.model';
import { catchError, finalize, of, switchMap } from 'rxjs';
import { NavigationService } from '../../../core/services/nagivation.service';
import { DxDataGridModule, DxButtonModule } from "devextreme-angular";
@Component({
  selector: 'app-engineer-by-id',
  imports: [CommonModule, DxDataGridModule, DxButtonModule],
  templateUrl: './engineer-by-id.component.html',
  styleUrl: './engineer-by-id.component.css',
})
export class EngineerById {
  private engineerService = inject(EngineerService);
  private route = inject(ActivatedRoute);
  private navigation = inject(NavigationService);

  loading = signal(true);

  engineer = toSignal<Engineer | null>(
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.engineerService.getById(id).pipe(
          finalize(() => this.loading.set(false)),
          catchError(() => of(null))
        );
      })
    ),
    { initialValue: null }
  );
  toEngineers() {
    this.navigation.navigateToEngineers();
  }

  deleteEngineer() {
    this.route.paramMap.pipe(
      switchMap(params => this.engineerService.delete(Number(params.get('id'))))
    ).subscribe({
      next: () => {
        this.navigation.navigateToEngineers();
      }
    });
  }
}
