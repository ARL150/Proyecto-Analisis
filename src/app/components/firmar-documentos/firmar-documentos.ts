import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  fechaFirma?: string; // Campo opcional para guardar la fecha
}

@Component({
  selector: 'app-firmar-documentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './firmar-documentos.html',
  styleUrl: './firmar-documentos.css'
})
export class FirmarDocumentos implements OnInit {
  tramites: Tramite[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const data = localStorage.getItem('tramitesParaFirmar');
    this.tramites = data ? JSON.parse(data) : [];
  }

  firmarTramite(index: number): void {
    const tramiteFirmado = this.tramites.splice(index, 1)[0];

    // Obtener fecha y hora actual
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toLocaleString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Añadir fecha al trámite firmado
    tramiteFirmado.fechaFirma = fechaFormateada;

    // Actualizar localStorage de pendientes
    localStorage.setItem('tramitesParaFirmar', JSON.stringify(this.tramites));

    // Guardar en firmados
    const firmadosData = localStorage.getItem('tramitesFirmados');
    const firmados: Tramite[] = firmadosData ? JSON.parse(firmadosData) : [];
    firmados.push(tramiteFirmado);
    localStorage.setItem('tramitesFirmados', JSON.stringify(firmados));

    // Notificación
    Swal.fire('Firmado', `El trámite "${tramiteFirmado.nombre}" fue firmado el ${fechaFormateada}.`, 'success');
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    Swal.fire({
      title: 'Cerrar sesión',
      text: '¿Estás seguro de que deseas cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        localStorage.clear();
        this.router.navigate(['/']);
      }
    });
  }
}
