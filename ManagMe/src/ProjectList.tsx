
import React, { useState, useEffect } from 'react';
import { Story } from './models';
import { UserManager } from './UserManager';
import { ProjectManager } from './ProjectManager';
import './ProjectList.css';

const userManager = new UserManager();
const projectManager = new ProjectManager();

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Story[]>([]);
  const [nextId, setNextId] = useState<number>(1);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');
  const [status, setStatus] = useState<'todo' | 'doing' | 'done'>('todo');

  useEffect(() => {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }
  }, []);

  const addProject = (newProject: Story) => {
    newProject.id = nextId.toString();
    setNextId(nextId + 1);
    setProjects([...projects, newProject]);
    localStorage.setItem('projects', JSON.stringify([...projects, newProject]));

    projectManager.addStory(newProject);

    setName('');
    setDescription('');
  };

  return (
    <div className='container'>
      <h1 className='mt-4 mb-4'>Lista Projektów</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newProject = {
            id: nextId.toString(),
            name,
            description,
            priority,
            project: projectManager.getCurrentProject(),
            creationDate: new Date(),
            status,
            ownerId: userManager.getCurrentUser().id,
          };
          addProject(newProject);
        }}
      >
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
          <input
            type="text"
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
        <button type="submit" className="btn btn-primary">Dodaj Projekt</button>
      </form>
      <ul className="list-group mt-4">
        {projects.map((project) => (
          <li key={project.id} className="list-group-item">
            <h5>{project.name}</h5>
            <p>{project.description}</p>
            <p>Status: {project.status}</p> {/* Dodane wyświetlanie statusu */}
            <p>Priorytet: {project.priority}</p> {/* Dodane wyświetlanie priorytetu */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
