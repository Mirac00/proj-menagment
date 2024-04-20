import React, { useState } from 'react';
import axios from 'axios';

const LoginForm: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/token', { login, password }); // Poprawiona ścieżka endpointu
      console.log(response.data); // otrzymujemy token i refreshToken
      // Tutaj możesz zapisać token w lokalnym stanie aplikacji lub cookie
    } catch (error) {
      console.error('Błąd logowania:', error);
      setError('Nieprawidłowy login lub hasło');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="login">Login:</label>
        <input
          type="text"
          id="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Hasło:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">Zaloguj</button>
    </form>
  );
};

export default LoginForm;
