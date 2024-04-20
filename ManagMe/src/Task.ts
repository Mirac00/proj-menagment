// Task.ts
export interface Task {
    id: string;
    name: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    story: string; // ID przynależnej historyjki
    estimatedTime: number; // Przewidywany czas wykonania w godzinach
    status: 'todo' | 'doing' | 'done';
    creationDate: Date;
    startDate?: Date; // Data rozpoczęcia zadania
    endDate?: Date; // Data zakończenia zadania
    assignedUserId?: string; // ID przypisanego użytkownika
  }
  