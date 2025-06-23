import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth';
import { User } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  user: User = { email: '', password: '' };
  nuevoCliente: User = { email: '', password: '' };
  emailUsuario = 'admin@notaria.com';
  showPassword = false;

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
  const resultado = this.auth.login(this.user.email, this.user.password);

  if (resultado === 'admin') {
    localStorage.setItem('loggedIn', 'admin');
    Swal.fire({
      icon: 'success',
      title: '¡Bienvenido!',
      text: 'Inicio de sesión exitoso',
      timer: 1500,
      showConfirmButton: false
    }).then(() => {
      this.router.navigate(['/dashboard']);
    });
  } else if (resultado === 'cliente') {
    localStorage.setItem('loggedIn', 'cliente');
    Swal.fire({
      icon: 'success',
      title: '¡Bienvenido!',
      text: 'Inicio de sesión exitoso',
      timer: 1500,
      showConfirmButton: false
    }).then(() => {
      this.router.navigate(['/cliente']);
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Usuario o contraseña incorrectos'
    });
  }
}

  registrarCliente() {
    const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');

    const existe = clientes.find((c: any) => c.email === this.nuevoCliente.email);
    if (existe) {
      Swal.fire('Error', 'Ya existe un cliente con ese correo', 'warning');
      return;
    }

    clientes.push({ ...this.nuevoCliente });
    localStorage.setItem('clientes', JSON.stringify(clientes));
    Swal.fire('¡Registrado!', 'Puedes iniciar sesión como cliente', 'success');

    // Opcional: limpiar campos
    this.nuevoCliente.email = '';
    this.nuevoCliente.password = '';
  }
}
