import { Component, OnInit } from '@angular/core';
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
  asignadoA?: number;
}

interface Trabajador {
  id: number;
  nombre: string;
  tramites: Tramite[];
}

@Component({
  selector: 'app-asignar-documentos',
  templateUrl: './asignar-documentos.html',
  styleUrls: ['./asignar-documentos.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class AsignarDocumentosComponent implements OnInit {
  trabajadores: Trabajador[] = [];
  tramitesPendientes: Tramite[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const trabajadoresData = localStorage.getItem('trabajadores');
    this.trabajadores = trabajadoresData ? JSON.parse(trabajadoresData) : [];

    const creadosData = localStorage.getItem('tramitesCreados');
    this.tramitesPendientes = creadosData ? JSON.parse(creadosData) : [];
  }

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

  asignarDesdePendientes(index: number) {
  const tramite = this.tramitesPendientes[index];

  if (!tramite.asignadoA) {
    Swal.fire('Error', 'Selecciona un trabajador.', 'error');
    return;
  }

  const trabajadorId = Number(tramite.asignadoA); // <-- Convertir a número aquí
  const trabajador = this.trabajadores.find(t => t.id === trabajadorId);

  if (!trabajador) {
    Swal.fire('Error', 'Trabajador no válido.', 'error');
    return;
  }

  if (trabajador.tramites.length >= 5) {
    Swal.fire({
      icon: 'error',
      title: 'Límite alcanzado',
      text: 'Este trabajador ya tiene 5 trámites asignados.'
    });
    return;
  }

  const nuevoTramite: Tramite = {
    nombre: tramite.nombre,
    descripcion: tramite.descripcion || '',
    documentos: tramite.documentos || [],
    interesado: tramite.interesado
  };

  trabajador.tramites.push(nuevoTramite);
  localStorage.setItem('trabajadores', JSON.stringify(this.trabajadores));

  const asignados = JSON.parse(localStorage.getItem('tramitesAsignados') || '[]');
  asignados.push({
    trabajadorId: trabajador.id,
    trabajadorNombre: trabajador.nombre,
    ...nuevoTramite
  });
  localStorage.setItem('tramitesAsignados', JSON.stringify(asignados));

  // Quitar trámite pendiente
  this.tramitesPendientes.splice(index, 1);
  localStorage.setItem('tramitesCreados', JSON.stringify(this.tramitesPendientes));

  Swal.fire({
    icon: 'success',
    title: 'Trámite asignado correctamente',
    text: `Se asignó a ${trabajador.nombre}`,
    timer: 2000,
    showConfirmButton: false
  });
}
}
