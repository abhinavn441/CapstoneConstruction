export interface Project {
  projectId: number;
  projectName: string;
  projectDescription: string;
  startDate: string;
  endDate?: string;
  status: number;
  managerId: number;
  managerName: string;
  estimatedBudget: number;
  actualCost: number;
}
