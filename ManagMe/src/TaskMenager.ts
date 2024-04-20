// TaskManager.ts
import { Task } from './Task';

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

  getTasksByStatus(status: 'todo' | 'doing' | 'done') {
    return this.tasks.filter(task => task.status === status);
  }

  getTasksByStory(storyId: string) {
    return this.tasks.filter(task => task.story === storyId);
  }
}
