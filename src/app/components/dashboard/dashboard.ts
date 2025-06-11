import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],  
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']  
})
export class Dashboard {
  options = [
    {
      title: 'Agendar Documentos',
      description: 'Programa citas para tus documentos notariales',
      icon: 'bi bi-calendar-plus',
      route: '/agendar-documentos'
    },
    {
      title: 'Firmar Documentos',
      description: 'Firma documentos digitalmente',
      icon: 'bi bi-pencil-square',
      route: '/firmar-documentos'
    },
    {
      title: 'Asignar Documentos',
      description: 'Asigna documentos a usuarios',
      icon: 'bi bi-person-badge',
      route: '/asignar-documentos'
    },
    {
      title: 'Trámites',
      description: 'Gestiona trámites notariales',
      icon: 'bi bi-folder-check',
      route: '/tramites'
    }
  ];

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }
}
