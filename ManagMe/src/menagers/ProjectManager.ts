import Project from '../models/Project';

export class ProjectManager {
  private projects: Project[] = [];
  private currentProjectId: string | null = null;

  constructor() {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      this.projects = JSON.parse(storedProjects);
    }
  }

  addProject(project: Project) {
    this.projects.push(project);
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  updateProject(updatedProject: Project) {
    this.projects = this.projects.map(project =>
      project.id === updatedProject.id ? updatedProject : project
    );
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  deleteProject(projectId: string) {
    this.projects = this.projects.filter(project => project.id !== projectId);
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  getProjectById(projectId: string): Project | undefined {
    return this.projects.find(project => project.id === projectId);
  }

  setCurrentProject(projectId: string) {
    this.currentProjectId = projectId;
    localStorage.setItem('currentProject', projectId);
  }

  getCurrentProject(): Project | null {
    if (!this.currentProjectId) return null;
    return this.getProjectById(this.currentProjectId) || null;
  }

  getProjects(): Project[] {
    return this.projects;
  }
}
