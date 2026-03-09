import { Component, signal, ViewChild } from '@angular/core';
import { CreateEngineer } from '../../../core/models/createengineer.model';
import { EngineerService } from '../../../core/services/engineer.service';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationService } from '../../../core/services/nagivation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DxTextBoxModule, DxButtonModule } from "devextreme-angular";
import { DxiItemModule } from "devextreme-angular/ui/nested";

@Component({
  selector: 'app-engineer-create',
  imports: [CommonModule, FormsModule, DxTextBoxModule, DxButtonModule, DxiItemModule],
  templateUrl: './engineer-create.component.html',
  styleUrl: './engineer-create.component.css',
})
export class EngineerCreate {
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
    this.submitting.set(true);
    this.engineerService.create(this.model).pipe(
      finalize(() => this.submitting.set(false))
    ).subscribe({
      next: () => {
        this.snackbar.open('Engineer created', 'Dismiss', {
          duration: 2000
        });
        this.navigation.navigateToEngineers();
      }
    });
  }
  back() {
    this.navigation.navigateToEngineers();
  }
}
