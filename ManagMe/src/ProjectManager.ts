// ProjectMenager.ts
import { Story } from './models';

export class ProjectManager {
  private currentProject: string = '';
  private stories: Story[] = [];

  setCurrentProject(project: string) {
    this.currentProject = project;
    localStorage.setItem('currentProject', project);
  }

  getCurrentProject() {
    return this.currentProject;
  }

  addStory(story: Story) {
    this.stories.push(story);
    localStorage.setItem('stories', JSON.stringify(this.stories));
  }

  updateStory(updatedStory: Story) {
    this.stories = this.stories.map(story =>
      story.id === updatedStory.id ? updatedStory : story
    );
    localStorage.setItem('stories', JSON.stringify(this.stories));
  }

  deleteStory(storyId: string) {
    this.stories = this.stories.filter(story => story.id !== storyId);
    localStorage.setItem('stories', JSON.stringify(this.stories));
  }

  getStoriesByStatus(status: 'todo' | 'doing' | 'done') {
    return this.stories.filter(story => story.status === status);
  }
}