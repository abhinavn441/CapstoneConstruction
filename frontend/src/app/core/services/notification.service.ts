import { Injectable } from "@angular/core";
import { INotification } from "./interfaces/notification.interface";

@Injectable({
    providedIn: 'root'
})
export class NotificationService implements INotification {
    
    showSuccess(message: string): void {
        alert(`Success: ${message}`);
        // TODO: Replace with proper toast/notification library
    }

    showError(message: string): void {
        alert(`Error: ${message}`);
        // TODO: Replace with proper toast/notification library
    }

    showInfo(message: string): void {
        alert(message);
        // TODO: Replace with proper toast/notification library
    }
}
