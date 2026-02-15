import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { EngineerService } from '../../../core/services/engineer.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Engineer } from '../../../core/models/engineer.model';
import { catchError, finalize, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-engineer-by-id',
  imports: [CommonModule],
  templateUrl: './engineer-by-id.component.html',
  styleUrl: './engineer-by-id.component.css',
})
export class EngineerById {
  private engineerService = inject(EngineerService);
  private route = inject(ActivatedRoute);
  
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
}
