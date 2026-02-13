import { Component, inject } from '@angular/core';
import { EngineerService } from '../../../core/services/engineer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { NavigationService } from '../../../core/services/nagivation.service';

@Component({
  selector: 'app-engineer-delete.component',
  imports: [],
  templateUrl: './engineer-delete.component.html',
  styleUrl: './engineer-delete.component.css',
})
export class EngineerDelete {
  constructor(
    private engineerService:EngineerService,
    private navigation: NavigationService
  ) {}
  
  private route=inject(ActivatedRoute);
  
  remove() : void {
    this.route.paramMap.pipe(
      switchMap(params => this.engineerService.delete(Number(params.get('id'))))
    ).subscribe({
      next: () => {
        this.navigation.navigateToEngineers();
      }
    });
  }
}
