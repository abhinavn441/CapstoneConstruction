import { Component, inject } from '@angular/core';
import { EngineerService } from '../../../core/services/engineer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-engineer-delete.component',
  imports: [],
  templateUrl: './engineer-delete.component.html',
  styleUrl: './engineer-delete.component.css',
})
export class EngineerDelete {
  private engineerService = inject(EngineerService);
  private route=inject(ActivatedRoute);
  private router=inject(Router);

  remove() : void {
    this.route.paramMap.pipe(
      switchMap(params => this.engineerService.delete(Number(params.get('id'))))
    ).subscribe({
      next: () => {
        this.router.navigate(['/engineers']);
      }
    });
  }
}
