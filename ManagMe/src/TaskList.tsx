
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
  const [story, setStory] = useState<string>('');

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
    <div className='container'>
      <h1 className='mt-4 mb-4'>Lista Zadań</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newTask: Task = {
            id: (tasks.length + 1).toString(),
            name,
            description,
            priority,
            story,
            estimatedTime: 0,
            status,
            creationDate: new Date(),
          };
          addTask(newTask);
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
        <div className="form-group">
          <select className="form-control" value={story} onChange={(e) => setStory(e.target.value)}>
            {/* Tutaj mogą być historyjki */}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Dodaj Zadanie</button>
      </form>
      <ul className="list-group mt-4">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item">
            <h5>{task.name}</h5>
            <p>{task.description}</p>
            <p>Status: {task.status}</p> {/* Dodane wyświetlanie statusu */}
            <p>Priorytet: {task.priority}</p> {/* Dodane wyświetlanie priorytetu */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
