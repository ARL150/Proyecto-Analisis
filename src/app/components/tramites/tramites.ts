import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tramites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tramites.html',
  styleUrl: './tramites.css'
})
export class Tramites {
constructor(private router: Router) {}

  tramites = [
    {
      nombre: 'Compraventa',
      descripcion: 'Trámite para transferir la propiedad de un bien inmueble.',
      documentos: ['INE de ambas partes', 'Escritura anterior', 'CURP', 'RFC', 'Boleta predial']
    },
    {
      nombre: 'Testamento',
      descripcion: 'Declaración de voluntad sobre el destino de bienes después de la muerte.',
      documentos: ['INE', 'CURP', 'Acta de nacimiento']
    },
    {
      nombre: 'Donación',
      descripcion: 'Transferencia voluntaria de bienes sin recibir pago.',
      documentos: ['INE de donante y donatario', 'Escritura del bien', 'CURP', 'RFC']
    },
    {
      nombre: 'Poder Notarial',
      descripcion: 'Documento que permite actuar legalmente en nombre de otra persona.',
      documentos: ['INE de ambas partes', 'CURP', 'Motivo del poder']
    },
    {
      nombre: 'Constitución de Sociedad',
      descripcion: 'Creación legal de una empresa o sociedad mercantil.',
      documentos: ['INE de socios', 'RFC', 'CURP', 'Objetivo de la empresa', 'Aportaciones']
    },
    {
      nombre: 'Divorcio Notarial',
      descripcion: 'Trámite para disolver el vínculo matrimonial de manera legal.',
      documentos: ['INE', 'Acta de matrimonio', 'Actas de nacimiento de hijos', 'Convenio de divorcio']
    },
    {
      nombre: 'Adopción',
      descripcion: 'Reconocimiento legal de un menor como hijo propio.',
      documentos: ['INE', 'Acta de nacimiento', 'Estudios socioeconómicos', 'Certificados médicos']
    },
    {
      nombre: 'Acta de Hechos',
      descripcion: 'Documento que certifica hechos ocurridos presenciados por el notario.',
      documentos: ['INE', 'Descripción detallada del hecho']
    },
    {
      nombre: 'Revocación de Poder',
      descripcion: 'Anulación de un poder notarial previamente otorgado.',
      documentos: ['INE', 'Poder original']
    },
    {
      nombre: 'Protocolización',
      descripcion: 'Incorporación de documentos privados al protocolo notarial.',
      documentos: ['Documento privado original', 'INE', 'CURP']
    },
    {
      nombre: 'Ratificación de Firmas',
      descripcion: 'Confirmación legal de que una firma es auténtica.',
      documentos: ['Documento firmado', 'INE del firmante']
    },
    {
      nombre: 'Testimonio Notarial',
      descripcion: 'Copia certificada de una escritura pública.',
      documentos: ['Número de escritura', 'INE del solicitante']
    },
    {
      nombre: 'Cancelación de Hipoteca',
      descripcion: 'Eliminación del gravamen de hipoteca sobre un inmueble.',
      documentos: ['Carta de instrucción del banco', 'Escritura', 'INE', 'Boleta predial']
    },
    {
      nombre: 'Fideicomiso',
      descripcion: 'Transferencia de bienes a un tercero para su administración.',
      documentos: ['INE', 'CURP', 'Contrato de fideicomiso', 'RFC']
    },
    {
      nombre: 'Capitulaciones Matrimoniales',
      descripcion: 'Acuerdo sobre bienes antes del matrimonio.',
      documentos: ['INE', 'CURP', 'Convenio entre partes']
    }
  ];

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }
}