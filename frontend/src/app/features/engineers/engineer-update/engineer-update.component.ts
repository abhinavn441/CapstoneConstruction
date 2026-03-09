import { Component, effect, inject, signal } from '@angular/core';
import { UpdateEngineer } from '../../../core/models/updateengineer.model';
import { EngineerService } from '../../../core/services/engineer.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, finalize, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationService } from '../../../core/services/nagivation.service';
import { Engineer } from '../../../core/models/engineer.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { DxButtonModule, DxTextBoxModule } from "devextreme-angular";

@Component({
  selector: 'app-engineer-update',
  imports: [CommonModule, FormsModule, DxButtonModule, DxTextBoxModule],
  templateUrl: './engineer-update.component.html',
  styleUrl: './engineer-update.component.css',
})
export class EngineerUpdate {
  model: UpdateEngineer = {
    engineerName: '',
    engineerRole: ''
  };
  submitting = signal(false);
  private engineerService = inject(EngineerService);
  private navigation = inject(NavigationService);
  private route = inject(ActivatedRoute);

  engineer = toSignal<Engineer | null>(
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.engineerService.getById(id).pipe(
          finalize(() => { }),
          catchError(() => of(null))
        );
      })
    ),
    { initialValue: null }
  );

  constructor() {
    effect(() => {
      const engineerData = this.engineer();
      if (engineerData) {
        this.model = {
          engineerName: engineerData.engineerName,
          engineerRole: engineerData.engineerRole
        };
      }
    });
  }

  submit(): void {
    this.submitting.set(true);
    this.route.paramMap.pipe(
      switchMap(params => this.engineerService.update(Number(params.get('id')), this.model)),
      finalize(() => this.submitting.set(false))
    ).subscribe({
      next: () => {
        this.navigation.navigateToEngineers();
      }
    });
  }

  back() {
    this.navigation.navigateToEngineers();
  }
}
