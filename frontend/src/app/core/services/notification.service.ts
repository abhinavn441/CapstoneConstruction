import { Injectable } from "@angular/core";
import { INotification } from "./interfaces/notification.interface";
import notify from 'devextreme/ui/notify';

@Injectable({
    providedIn: 'root'
})
export class NotificationService implements INotification {
    
    showSuccess(message: string): void {
        notify(`Success: ${message}`);
    }

    showError(message: string): void {
        notify(`Error: ${message}`);
    }

    showInfo(message: string): void {
        notify(message);
    }
}
