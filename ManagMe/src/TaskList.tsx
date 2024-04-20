import React, { useState, useEffect } from 'react';
import { Task } from './Task';
import { TaskManager } from './TaskMenager';

const taskManager = new TaskManager();

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');
  const [status, setStatus] = useState<'todo' | 'doing' | 'done'>('todo');
  const [story, setStory] = useState<string>(''); // Dodane pole do wyboru historii

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const addTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
    taskManager.addTask(newTask);

    setName('');
    setDescription('');
  };

  return (
    <div className='TaskFormList'>
      <h1>Lista Zadań</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newTask: Task = {
            id: (tasks.length + 1).toString(),
            name,
            description,
            priority,
            story,
            estimatedTime: 0, // Można dodać pole do formularza
            status,
            creationDate: new Date(),
          };
          addTask(newTask);
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Nazwa"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <textarea
          name="description"
          placeholder="Opis"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <select value={priority} onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}>
          <option value="low">Niski</option>
          <option value="medium">Średni</option>
          <option value="high">Wysoki</option>
        </select>
        <br />
        <select value={status} onChange={(e) => setStatus(e.target.value as 'todo' | 'doing' | 'done')}>
          <option value="todo">Do zrobienia</option>
          <option value="doing">W trakcie</option>
          <option value="done">Zrobione</option>
        </select>
        <br />
        <select value={story} onChange={(e) => setStory(e.target.value)}>
          {/* Tutaj możesz dodać opcje z historiami */}
        </select>
        <br />
        <button type="submit">Dodaj Zadanie</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name}
            <br />
            {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;