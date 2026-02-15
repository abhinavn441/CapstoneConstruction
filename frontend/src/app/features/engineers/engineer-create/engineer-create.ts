import { Component, signal } from '@angular/core';
import { CreateEngineer } from '../../../core/models/createengineer.model';
import { EngineerService } from '../../../core/services/engineer.service';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationService } from '../../../core/services/nagivation.service';

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

  constructor(
    private engineerService: EngineerService,
    private navigation: NavigationService
  ) {}

  submit(): void {
    this.submitting.set(true);
    this.engineerService.create(this.model).pipe(
      finalize(() => this.submitting.set(false))
    ).subscribe({
      next: () => {
        this.navigation.navigateToEngineers();
      }
    });
  }
}
