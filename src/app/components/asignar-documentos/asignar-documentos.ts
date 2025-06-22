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

interface Trabajador {
  id: number;
  nombre: string;
  tramites: Tramite[];
}

@Component({
  selector: 'app-asignar-documentos',
  templateUrl: './asignar-documentos.html',
  styleUrls: ['./asignar-documentos.css'],
  imports: [FormsModule, CommonModule],

})
export class AsignarDocumentosComponent {
  constructor(private router: Router) {
  const data = localStorage.getItem('trabajadores');
  if (data) {
    this.trabajadores = JSON.parse(data);
  } else {
    localStorage.setItem('trabajadores', JSON.stringify(this.trabajadores));
  }
}
  // Lista de trámites disponibles
  tramitesDisponibles: string[] = [
    'Compraventa', 'Testamento', 'Donación', 'Poder notarial',
    'Acta constitutiva', 'Divorcio', 'Adopción', 'Certificación de documentos',
    'Fe de hechos', 'Permuta', 'Hipoteca', 'Cancelación de hipoteca',
    'Sucesión testamentaria', 'Protocolización', 'Acta de matrimonio'
  ];

  // Datos del interesado
  interesado: Interesado = {
    nombre: '',
    correo: '',
    telefono: ''
  };


  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }

  // Selección
  selectedTrabajadorId: number | null = null;
  selectedTramite: string = '';
  asignando = false;

  // Lista de trabajadores
  trabajadores: Trabajador[] = [
    { id: 1, nombre: 'Andrea López', tramites: [] },
    { id: 2, nombre: 'Carlos Méndez', tramites: [] },
    { id: 3, nombre: 'Lucía Pérez', tramites: [] },
    { id: 4, nombre: 'Marco Díaz', tramites: [] },
    { id: 5, nombre: 'Sofía Ríos', tramites: [] },
    { id: 6, nombre: 'Javier Torres', tramites: [] },
    { id: 7, nombre: 'Daniela Cruz', tramites: [] },
    { id: 8, nombre: 'Fernando Gómez', tramites: [] },
  ];



  // Método para asignar trámite
  // Método para asignar trámite
asignarTramite() {
  if (!this.selectedTrabajadorId || !this.selectedTramite || !this.interesado.nombre) {
    Swal.fire({
      icon: 'warning',
      title: 'Faltan datos',
      text: 'Selecciona un trabajador, un trámite y llena la información del interesado.'
    });
    return;
  }

  this.asignando = true;

  setTimeout(() => {
    const trabajador = this.trabajadores.find(t => t.id === Number(this.selectedTrabajadorId));

    if (trabajador) {
      if (trabajador.tramites.length < 5) {
        const nuevoTramite: Tramite = {
          nombre: this.selectedTramite,
          descripcion: '',
          documentos: [],
          interesado: { ...this.interesado }
        };

        // Guardar en el trabajador
        trabajador.tramites.push(nuevoTramite);
        localStorage.setItem('trabajadores', JSON.stringify(this.trabajadores));

        // Guardar en lista global
        const tramitesGlobal = JSON.parse(localStorage.getItem('tramitesAsignados') || '[]');
        tramitesGlobal.push({
          trabajadorId: trabajador.id,
          trabajadorNombre: trabajador.nombre,
          ...nuevoTramite
        });
        localStorage.setItem('tramitesAsignados', JSON.stringify(tramitesGlobal));

        Swal.fire({
          icon: 'success',
          title: 'Trámite asignado',
          text: `El trámite fue asignado correctamente a ${trabajador.nombre}.`,
          timer: 2000,
          showConfirmButton: false
        });

        // Limpiar campos
        this.selectedTramite = '';
        this.interesado = { nombre: '', correo: '', telefono: '' };
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Límite alcanzado',
          text: 'Este trabajador ya tiene 5 trámites asignados.'
        });
      }
    }

    this.asignando = false;
  }, 500);
}

}
