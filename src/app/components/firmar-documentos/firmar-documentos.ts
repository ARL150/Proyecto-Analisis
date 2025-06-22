import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  ngOnInit(): void {
    const data = localStorage.getItem('tramitesParaFirmar');
    this.tramites = data ? JSON.parse(data) : [];
  }

  firmarTramite(index: number): void {
    const tramiteFirmado = this.tramites.splice(index, 1)[0];

    // Obtener fecha actual
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Guardar el trámite sin modificar su estructura, puedes añadir la fecha si quieres
    localStorage.setItem('tramitesParaFirmar', JSON.stringify(this.tramites));

    const firmadosData = localStorage.getItem('tramitesFirmados');
    const firmados: Tramite[] = firmadosData ? JSON.parse(firmadosData) : [];
    firmados.push(tramiteFirmado);
    localStorage.setItem('tramitesFirmados', JSON.stringify(firmados));

    // Notificación con fecha real
    Swal.fire('Firmado', `El trámite "${tramiteFirmado.nombre}" fue firmado el ${fechaFormateada}.`, 'success');
  }
}
