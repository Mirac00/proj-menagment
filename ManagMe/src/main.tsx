
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ProjectList from './ProjectList.tsx';
import TaskList from './TaskList.tsx';
import LoginForm from './LoginForm.tsx';
import ThemeSwitcher from './ThemeSwitcher';
import './main.css';

ReactDOM.render(
  <React.StrictMode>
    <ThemeSwitcher />
    <LoginForm />
    <ProjectList />
    <TaskList />
  </React.StrictMode>,
  document.getElementById('root')
);
