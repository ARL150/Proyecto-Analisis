import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private currentUserType: 'admin' | 'cliente' | null = null;

  login(email: string, password: string): 'admin' | 'cliente' | null {
    if (email === 'admin@notaria.com' && password === '123456') {
      this.isAuthenticated = true;
      this.currentUserType = 'admin';
      return 'admin';
    }

    const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
    const clienteEncontrado = clientes.find((c: any) => c.email === email && c.password === password);

    if (clienteEncontrado) {
      this.isAuthenticated = true;
      this.currentUserType = 'cliente';
      return 'cliente';
    }

    return null;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.currentUserType = null;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUserType(): 'admin' | 'cliente' | null {
    return this.currentUserType;
  }
}
