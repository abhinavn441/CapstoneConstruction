import { Component, signal, ViewChild } from '@angular/core';
import { CreateEngineer } from '../../../core/models/createengineer.model';
import { EngineerService } from '../../../core/services/engineer.service';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NavigationService } from '../../../core/services/nagivation.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-engineer-create',
  imports: [CommonModule, FormsModule],
  templateUrl: './engineer-create.component.html',
  styleUrl: './engineer-create.component.css',
})
export class EngineerCreate {
  @ViewChild('form') form!:NgForm;
  model: CreateEngineer = {
    engineerName: '',
    engineerRole: ''
  };
  submitting = signal(false);

  constructor(
    private engineerService: EngineerService,
    private navigation: NavigationService,
    private snackbar: MatSnackBar
  ) { }

  submit(): void {
    if(this.submitting()) return;
    console.log(this.form.dirty)
    this.submitting.set(true);
    this.engineerService.create(this.model).pipe(
      finalize(() => this.submitting.set(false))
    ).subscribe({
      next: () => {
        this.form.resetForm();
        this.snackbar.open('Engineer created', 'Dismiss', {
          duration: 2000
        });
        this.navigation.navigateToEngineers();
      }
    });
  }

  canDeactivate() : boolean {
    if(!this.form?.dirty) return true;

    return confirm('You have unsaved chnages.Leave this page?');
  }
}
