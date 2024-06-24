import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { User } from '@models/User';
import { UserManager } from '../menagers/UserManager';

const userManager = new UserManager();

const LoginForm: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const user = await userManager.getCurrentUser();
      if (user) {
        setIsLoggedIn(true);
        setUserData(user);
      }
    };
    checkUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = await userManager.login(login, password);
    if (user) {
      setIsLoggedIn(true);
      setUserData(user);
      console.log('Token:', localStorage.getItem('token')); // Wyświetlenie tokenu w konsoli
      console.log('Refresh Token:', localStorage.getItem('refreshToken')); // Wyświetlenie refresh tokenu w konsoli
    } else {
      setError('Nieprawidłowy login lub hasło');
    }
  };

  const handleLogout = () => {
    userManager.logout();
    setIsLoggedIn(false);
    setUserData(null);
    setLogin('');
    setPassword('');
  };

  return (
    <div className="container mt-5">
      {!isLoggedIn ? (
        <form onSubmit={handleSubmit}>
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
      ) : (
        <div>
          <h3>Zalogowany użytkownik:</h3>
          {userData && (
            <div>
              <p>ID: {userData.id}</p>
              <p>Imię: {userData.firstName}</p>
              <p>Nazwisko: {userData.lastName}</p>
              <p>Rola: {userData.role}</p>
            </div>
          )}
          <button onClick={handleLogout} className="btn btn-secondary">Wyloguj</button>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
