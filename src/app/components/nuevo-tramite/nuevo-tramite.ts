import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Interesado {
  nombre: string;
  correo: string;
  telefono: string;
}

interface Tramite {
  nombre: string;
  descripcion: string;
  documentos: string[];
  interesado: Interesado;
}

@Component({
  selector: 'app-nuevo-tramite',
  templateUrl: './nuevo-tramite.html',
  styleUrls: ['./nuevo-tramite.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class NuevoTramite {
  constructor(private router: Router) {}

  tramitesDisponibles: string[] = [
    'Compraventa', 'Testamento', 'Donación', 'Poder notarial',
    'Acta constitutiva', 'Divorcio', 'Adopción', 'Certificación de documentos',
    'Fe de hechos', 'Permuta', 'Hipoteca', 'Cancelación de hipoteca',
    'Sucesión testamentaria', 'Protocolización', 'Acta de matrimonio'
  ];

  interesado: Interesado = {
    nombre: '',
    correo: '',
    telefono: ''
  };

  selectedTramite: string = '';
  asignando = false;

  goToDashboard() {
    const tipoUsuario = localStorage.getItem('loggedIn');
    if (tipoUsuario === 'admin') {
      this.router.navigate(['/dashboard']);
    } else if (tipoUsuario === 'cliente') {
      this.router.navigate(['/cliente']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }

  asignarTramite() {
  if (!this.selectedTramite || !this.interesado.nombre) {
    Swal.fire({
      icon: 'warning',
      title: 'Faltan datos',
      text: 'Selecciona un trámite y llena la información del interesado.'
    });
    return;
  }

  this.asignando = true;

  setTimeout(() => {
    const nuevoTramite: Tramite = {
      nombre: this.selectedTramite,
      descripcion: '',
      documentos: [],
      interesado: { ...this.interesado }
    };

    // 🔹 Obtener los trámites ya creados (si existen)
    const existentes = JSON.parse(localStorage.getItem('tramitesCreados') || '[]');

    // 🔹 Agregar el nuevo trámite a la lista
    existentes.push(nuevoTramite);

    // 🔹 Guardar la lista actualizada
    localStorage.setItem('tramitesCreados', JSON.stringify(existentes));

    Swal.fire({
      icon: 'success',
      title: 'Trámite creado',
      text: 'El trámite fue registrado correctamente.',
      timer: 2000,
      showConfirmButton: false
    });

    this.selectedTramite = '';
    this.interesado = { nombre: '', correo: '', telefono: '' };
    this.asignando = false;
  }, 500);
}
}
