import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  private defaultUser = {
    email: 'admin@notaria.com',
    password: '123456'
  };

  login(email: string, password: string): boolean {
    if (email === this.defaultUser.email && password === this.defaultUser.password) {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
