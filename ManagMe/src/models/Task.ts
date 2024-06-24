export interface Task {
  id: string;
  name: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  storyId: string;
  estimatedTime: number;
  status: 'todo' | 'doing' | 'done';
  creationDate: Date;
  startDate?: Date;
  endDate?: Date;
  assignedUserId?: string;
}
