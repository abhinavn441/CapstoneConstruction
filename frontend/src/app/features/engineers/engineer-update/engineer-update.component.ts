import { Component, inject, signal } from '@angular/core';
import { UpdateEngineer } from '../../../core/models/updateengineer.model';
import { EngineerService } from '../../../core/services/engineer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-engineer-update',
  imports: [CommonModule, FormsModule],
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
  private router=inject(Router);
  private route=inject(ActivatedRoute);

  submit() : void {
    this.submitting.set(true);
    this.route.paramMap.pipe(
      switchMap(params => this.engineerService.update(Number(params.get('id')), this.model)),
        finalize(() => this.submitting.set(false))
      ).subscribe({
        next: () => {
          this.router.navigate(['/engineers']);
        }
      });
  }
}
