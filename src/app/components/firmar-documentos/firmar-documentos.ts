import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
}
