export interface CreateTask {
    taskName: string;
    taskDescription: string;
    status: number;
    projectId: number;
    engineerId?:number;
}