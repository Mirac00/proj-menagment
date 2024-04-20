import { User } from './models';

export class UserManager {
  private currentUser: User;

  constructor() {
    this.currentUser = {
      id: '1',
      firstName: 'Jan',
      lastName: 'Kowalski',
      role: 'admin', 
    };
  }

  getCurrentUser() {
    return this.currentUser;
  }
}