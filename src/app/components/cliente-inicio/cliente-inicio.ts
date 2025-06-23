import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface ClienteOption {
  title: string;
  description: string;
  icon: string;
  route: string;
  pendientes?: number;
}

@Component({
  selector: 'app-cliente-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cliente-inicio.html',
  styleUrls: ['./cliente-inicio.css']
})
export class ClienteInicio {
  options: ClienteOption[] = [
    {
      title: 'Trámites',
      description: 'Consulta y seguimiento de tus trámites notariales',
      icon: 'bi bi-folder-check',
      route: '/tramites'
    },
    {
      title: 'Agendar Documentos',
      description: 'Programa citas para tus documentos notariales',
      icon: 'bi bi-calendar-plus',
      route: '/agendar-documentos'
    },
    {
      title: 'Crear Nuevo Documento',
      description: 'Crearas un nuevo documento para que sea procesado',
      icon: 'bi bi-person-badge',
      route: '/nuevo-tramite'
    },
  ];

  constructor(private router: Router) {
    const finalizados = localStorage.getItem('documentosFinalizados');
    const pendientesFinalizados = finalizados ? JSON.parse(finalizados).length : 0;

    this.options = this.options.map(opt => {
      if (opt.route === '/documentos-finalizados') {
        return { ...opt, pendientes: pendientesFinalizados };
      }
      return opt;
    });
  }

  logout() {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }
}
