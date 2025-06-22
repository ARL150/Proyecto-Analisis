import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-documentos-finalizados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './documentos-finalizados.html',
  styleUrls: ['./documentos-finalizados.css']
})
export class DocumentosFinalizados {
  documentosFirmados: any[] = [];

  constructor() {
    const data = localStorage.getItem('tramitesFirmados');
    if (data) {
      this.documentosFirmados = JSON.parse(data);
    }
  }
}
