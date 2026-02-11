import { Component, inject, signal } from '@angular/core';
import { CreateEngineer } from '../../../core/models/createengineer.model';
import { EngineerService } from '../../../core/services/engineer.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-engineer-create',
  imports: [CommonModule, FormsModule],
  templateUrl: './engineer-create.html',
  styleUrl: './engineer-create.css',
})
export class EngineerCreate {
  model: CreateEngineer = {
    engineerName: '',
    engineerRole: ''
  };
  submitting = signal(false);
  private engineerService = inject(EngineerService);
  private router = inject(Router);

  submit(): void {
    this.submitting.set(true);
    this.engineerService.create(this.model).pipe(
      finalize(() => this.submitting.set(false))
    ).subscribe({
      next: () => {
        this.router.navigate(['/engineers']);
      }
    });
  }
}
