import { User } from '../models/User';

export class UserManager {
  private currentUser: User | null = null;

  constructor() {
    this.checkToken();
  }

  async login(login: string, password: string): Promise<User | null> {
    try {
      const response = await fetch('http://localhost:3000/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login, password })
      });

      if (!response.ok) {
        throw new Error('Invalid login or password');
      }

      const data = await response.json();
      this.currentUser = data.user;
      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken); // Zapisz refresh token
      localStorage.setItem('currentUser', JSON.stringify(data.user)); // Zapisz dane użytkownika
      return data.user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken'); // Usuń refresh token
    localStorage.removeItem('currentUser'); // Usuń dane użytkownika
  }

  async getCurrentUser(): Promise<User | null> {
    if (this.currentUser) {
      return this.currentUser;
    }

    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    const user = localStorage.getItem('currentUser');

    if (!token || !refreshToken || !user) {
      this.logout();
      return null;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));

    if (Date.now() >= payload.exp * 1000) {
      try {
        const response = await fetch('http://localhost:3000/refreshToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ refreshToken })
        });

        if (!response.ok) {
          this.logout();
          return null;
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        this.currentUser = JSON.parse(user);
        return this.currentUser;
      } catch (error) {
        console.error('Failed to refresh token', error);
        this.logout();
        return null;
      }
    } else {
      this.currentUser = JSON.parse(user);
      return this.currentUser;
    }
  }

  private async checkToken() {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!token || !refreshToken) {
      this.logout();
      return;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));

    if (Date.now() >= payload.exp * 1000) {
      try {
        const response = await fetch('http://localhost:3000/refreshToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ refreshToken })
        });

        if (!response.ok) {
          this.logout();
          return;
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
      } catch (error) {
        console.error('Failed to refresh token', error);
        this.logout();
      }
    } else {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    }
  }
}
