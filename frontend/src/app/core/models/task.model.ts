export interface Task {
    taskId: number;
    taskName: string;
    taskDescription: string;
    status: number;
    projectId: number;
    engineerId?: number;
}