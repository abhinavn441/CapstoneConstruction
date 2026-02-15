import { Component, signal } from '@angular/core';
import { UpdateEngineer } from '../../../core/models/updateengineer.model';
import { EngineerService } from '../../../core/services/engineer.service';
import { ActivatedRoute } from '@angular/router';
import { finalize, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationService } from '../../../core/services/nagivation.service';

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

  constructor(
    private engineerService: EngineerService,
    private navigation: NavigationService,
    private route: ActivatedRoute
  ) {}

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
}
