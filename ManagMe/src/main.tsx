import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import ProjectList from './components/ProjectList';
import StoryList from './components/StoryList';
import TaskList from './components/TaskList';
import LoginForm from './components/LoginForm';
import ThemeSwitcher from './ThemeSwitcher';
import './main.css';
import { UserManager } from '../src/menagers/UserManager';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const userManager = new UserManager();
      const currentUser = await userManager.getCurrentUser();
      if (currentUser) {
        setIsLoggedIn(true);
      }
    };
    checkUser();
  }, []);

  return (
    <Router>
      <ThemeSwitcher />
      <LoginForm />
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/:projectId/stories" element={<StoryList />} />
        <Route path="/projects/:projectId/stories/:storyId/tasks" element={<TaskList />} />
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
