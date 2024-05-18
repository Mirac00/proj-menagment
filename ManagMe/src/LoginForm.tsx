import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const LoginForm: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log('Wysyłane dane:', { login, password }); 
      const response = await axios.post('http://localhost:3000/token', { login, password });
      console.log(response.data); 
    } catch (error: any) {
      console.error('Błąd logowania:', error);
      setError('Nieprawidłowy login lub hasło');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="mb-3">
        <label htmlFor="login" className="form-label">Login:</label>
        <input
          type="text"
          id="login"
          className="form-control"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Hasło:</label>
        <input
          type="password"
          id="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit" className="btn btn-primary">Zaloguj</button>
    </form>
  );
};

export default LoginForm;
