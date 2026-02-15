export interface INotification {
    showSuccess(message: string): void;
    showError(message: string): void;
    showInfo(message: string): void;
}
