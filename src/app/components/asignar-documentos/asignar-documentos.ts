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

  // Si hay datos previos, los usamos. Si no, guardamos los actuales en localStorage.
  if (trabajadoresData) {
    this.trabajadores = JSON.parse(trabajadoresData);
  } else {
    // Esta es tu lista original que se debe mantener
    this.trabajadores = [
      { id: 1, nombre: 'Andrea López', tramites: [] },
      { id: 2, nombre: 'Carlos Méndez', tramites: [] },
      { id: 3, nombre: 'Lucía Pérez', tramites: [] },
      { id: 4, nombre: 'Marco Díaz', tramites: [] },
      { id: 5, nombre: 'Sofía Ríos', tramites: [] },
      { id: 6, nombre: 'Javier Torres', tramites: [] },
      { id: 7, nombre: 'Daniela Cruz', tramites: [] },
      { id: 8, nombre: 'Fernando Gómez', tramites: [] },
    ];
    localStorage.setItem('trabajadores', JSON.stringify(this.trabajadores));
  }

  const creadosData = localStorage.getItem('tramitesCreados');
  this.tramitesPendientes = creadosData ? JSON.parse(creadosData) : [];
}

  goToDashboard() {
    this.router.navigate(['/dashboard']);
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
