import { Component, inject, signal } from '@angular/core';
import { EngineerService } from '../../../core/services/engineer.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Engineer } from '../../../core/models/engineer.model';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-engineer-list',
  imports: [],
  templateUrl: './engineer-list.component.html',
  styleUrl: './engineer-list.component.css',
})
export class EngineerList {
  private engineerService=inject(EngineerService);
  loading=signal(true);
  
  engineers=toSignal<Engineer[]>(
    this.engineerService.getAll().pipe(
      finalize(() => this.loading.set(false)),
      catchError(() => of([]))
    ),
  );
}
