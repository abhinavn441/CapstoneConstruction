import { Component } from '@angular/core';
import { NavigationService } from '../../core/services/nagivation.service';

@Component({
  selector: 'app-menu.component',
  imports: [],
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
