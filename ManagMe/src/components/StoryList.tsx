import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Story } from '../models/Story';
import { UserManager } from '../menagers/UserManager';
import { StoryManager } from '../menagers/StoryManager';

const userManager = new UserManager();
const storyManager = new StoryManager();

const StoryList: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');
  const [status, setStatus] = useState<'todo' | 'doing' | 'done'>('todo');
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (projectId) {
      const storedStories = storyManager.getStoriesByProject(projectId);
      setStories(storedStories);
    }
  }, [projectId]);

  const addStory = (newStory: Story) => {
    storyManager.addStory(newStory);
    setStories([...stories, newStory]);
    setName('');
    setDescription('');
  };

  const handleStorySelect = (storyId: string) => {
    navigate(`/projects/${projectId}/stories/${storyId}/tasks`);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentUser = await userManager.getCurrentUser();
    const newStory: Story = {
      id: (stories.length + 1).toString(),
      name,
      description,
      priority,
      projectId: projectId || '',  // default to empty string if undefined
      creationDate: new Date(),
      status,
      ownerId: currentUser?.id || '0',  // Ustawienie ID właściciela na '0', jeśli nie jest zalogowany
    };
    addStory(newStory);
  };

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">Lista Historyjek</h1>
      <button className="btn btn-secondary mb-4" onClick={() => navigate('/projects')}>Powrót do listy projektów</button>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Nazwa"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            name="description"
            placeholder="Opis"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <select className="form-control" value={priority} onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}>
            <option value="low">Niski</option>
            <option value="medium">Średni</option>
            <option value="high">Wysoki</option>
          </select>
        </div>
        <div className="form-group">
          <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value as 'todo' | 'doing' | 'done')}>
            <option value="todo">Do zrobienia</option>
            <option value="doing">W trakcie</option>
            <option value="done">Zrobione</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Dodaj Historyjkę</button>
      </form>
      <ul className="list-group mt-4">
        {stories.map((story) => (
          <li key={story.id} className="list-group-item" onClick={() => handleStorySelect(story.id)}>
            <h5>{story.name}</h5>
            <p>{story.description}</p>
            <p>Status: {story.status}</p>
            <p>Priorytet: {story.priority}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoryList;
