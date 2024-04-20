export interface User {
  id: string;
  firstName: string;
  lastName: string;
  role?: 'admin' | 'devops' | 'developer'; // Dodana rola użytkownika
}

export interface Story {
  id: string;
  name: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  project: string;
  creationDate: Date;
  status: 'todo' | 'doing' | 'done';
  ownerId: string;
  assignedUserId?: string; // Dodane przypisanie użytkownika do zadania
  startTime?: Date; // Dodane pole czasu rozpoczęcia zadania
  endTime?: Date; // Dodane pole czasu zakończenia zadania
}