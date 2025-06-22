import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documentos-finalizados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './documentos-finalizados.html',
  styleUrls: ['./documentos-finalizados.css']
})
export class DocumentosFinalizados {
  documentosFirmados: any[] = [];

  constructor(private router: Router) {
    const data = localStorage.getItem('tramitesFirmados');
    if (data) {
      this.documentosFirmados = JSON.parse(data);
    }
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
