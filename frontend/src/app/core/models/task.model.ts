export interface Task {
    taskItemId: number;
    taskName: string;
    taskDescription: string;
    status: number;
    projectId: number;
    engineerId?: number;
}