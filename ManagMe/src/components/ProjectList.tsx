import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Project from '@models/Project';
import { ProjectManager } from '../menagers/ProjectManager';


const projectManager = new ProjectManager();

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const isLoggedIn = !!localStorage.getItem('token'); // Simple check for authentication
  const navigate = useNavigate();

  useEffect(() => {
    const storedProjects = projectManager.getProjects();
    if (storedProjects) {
      setProjects(storedProjects);
    }
  }, []);

  const addProject = (newProject: Project) => {
    projectManager.addProject(newProject);
    setProjects([...projects, newProject]);
    setName('');
    setDescription('');
  };

  const handleProjectSelect = (projectId: string) => {
    projectManager.setCurrentProject(projectId);
    navigate(`/projects/${projectId}/stories`);
  };

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">Lista Projektów</h1>
      {isLoggedIn && (
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
          <button type="submit" className="btn btn-primary">Dodaj Projekt</button>
        </form>
      )}
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
