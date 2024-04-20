import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ProjectList from './ProjectList.tsx'
import TaskList from './TaskList.tsx'
import LoginForm from './LoginForm.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoginForm />
    <ProjectList />
    <TaskList />
  </React.StrictMode>,
)
