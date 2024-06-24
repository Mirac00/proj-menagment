import { Task } from '../models/Task';

export class TaskManager {
  private tasks: Task[] = [];

  constructor() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }

  addTask(task: Task) {
    this.tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  updateTask(updatedTask: Task) {
    this.tasks = this.tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  deleteTask(taskId: string) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  getTasksByStory(storyId: string): Task[] {
    return this.tasks.filter(task => task.storyId === storyId);
  }

  getTasksByStatus(status: 'todo' | 'doing' | 'done'): Task[] {
    return this.tasks.filter(task => task.status === status);
  }
}
