import { Story } from '../models/Story';

export class StoryManager {
  private stories: Story[] = [];

  constructor() {
    const storedStories = localStorage.getItem('stories');
    if (storedStories) {
      this.stories = JSON.parse(storedStories);
    }
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

  getStoriesByProject(projectId: string): Story[] {
    return this.stories.filter(story => story.projectId === projectId);
  }

  getStoriesByStatus(status: 'todo' | 'doing' | 'done'): Story[] {
    return this.stories.filter(story => story.status === status);
  }
}
