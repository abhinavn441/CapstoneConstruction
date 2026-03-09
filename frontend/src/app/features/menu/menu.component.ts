import { Component } from '@angular/core';
import { NavigationService } from '../../core/services/nagivation.service';
import { DxButtonModule } from 'devextreme-angular';

@Component({
  selector: 'app-menu.component',
  imports: [DxButtonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  constructor(
    private navigation: NavigationService
  ) { }
  toProjects() {
    this.navigation.navigateToProjects();
  }

  toTasks() {
    this.navigation.navigateToTasks();
  }

  toEngineers() {
    this.navigation.navigateToEngineers();
  }

  back() {
    this.navigation.navigateToLogin();
  }
}
