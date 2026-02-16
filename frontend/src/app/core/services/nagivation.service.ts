import { Injectable } from "@angular/core";
import { INavigation } from "./interfaces/inagivation";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class NavigationService implements INavigation {
    constructor(
        private router:Router
    ) {}

    navigateToProjects() {
        this.router.navigate(['/projects']);
    }
    navigateToTasks() {
        this.router.navigate(['/tasks']);
    }
    navigateToEngineers() {
        this.router.navigate(['/engineers']);
    }
    navigateToLogin() {
        this.router.navigate(['/']);
    }

    navigateToMenu() {
        this.router.navigate(['/menu']);
    }
}