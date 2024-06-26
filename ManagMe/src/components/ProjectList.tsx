import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Project from '../models/Project'; // Załóżmy, że to jest poprawna ścieżka
import { ProjectManager } from '../menagers/ProjectManager'; // Poprawiono literówkę w ścieżce

const projectManager = new ProjectManager();

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const isLoggedIn = !!localStorage.getItem('token'); // Proste sprawdzenie autentykacji
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedProjects = projectManager.getProjects();
      if (storedProjects) {
        setProjects(storedProjects);
      }
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  }, []);

  const addProject = (newProject: Project) => {
    if (!isLoggedIn) {
      alert('Please log in to add a project.');
      return;
    }
    try {
      projectManager.addProject(newProject);
      setProjects([...projects, newProject]);
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleProjectSelect = (projectId: string) => {
    projectManager.setCurrentProject(projectId);
    navigate(`/projects/${projectId}/stories`);
  };

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">Lista Projektów</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newProject = {
            id: (projects.length + 1).toString(),
            name,
            description
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
            disabled={!isLoggedIn}
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
            disabled={!isLoggedIn}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!isLoggedIn}>Dodaj Projekt</button>
        {!isLoggedIn && <p className="text-warning">Zaloguj się, aby dodać projekt.</p>}
      </form>
      <ul className="list-group mt-4">
        {projects.map((project) => (
          <li key={project.id} className="list-group-item" onClick={() => handleProjectSelect(project.id)}>
            <h5>{project.name}</h5>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
