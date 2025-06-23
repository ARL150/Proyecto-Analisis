import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface DashboardOption {
  title: string;
  description: string;
  icon: string;
  route: string;
  pendientes?: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  options: DashboardOption[] = [
    {
      title: 'Trámites',
      description: 'Gestiona trámites notariales',
      icon: 'bi bi-folder-check',
      route: '/tramites'
    },
    {
      title: 'Crear Nuevo Documento',
      description: 'Crearas un nuevo documento para que sea procesado',
      icon: 'bi bi-person-badge',
      route: '/nuevo-tramite'
    },
    {
      title: 'Asignar Documentos',
      description: 'Asigna documentos a usuarios',
      icon: 'bi bi-person-badge',
      route: '/asignar-documentos'
    },
    {
      title: 'Ver Trámites',
      description: 'Consulta todos los trámites ya asignados',
      icon: 'bi bi-list-check',
      route: '/ver-tramites'
    },
    {
      title: 'Firmar Documentos',
      description: 'Firma documentos digitalmente',
      icon: 'bi bi-pencil-square',
      route: '/firmar-documentos'
    },
    {
      title: 'Documentos Finalizados',
      description: 'Consulta los documentos ya firmados y cerrados',
      icon: 'bi bi-file-earmark-check',
      route: '/documentos-finalizados'
    }
  ];

  constructor(private router: Router) {
    const firmar = localStorage.getItem('tramitesParaFirmar');
    const ver = localStorage.getItem('tramitesAsignados');
    const finalizados = localStorage.getItem('documentosFinalizados');

    const pendientesFirmar = firmar ? JSON.parse(firmar).length : 0;
    const pendientesVer = ver ? JSON.parse(ver).length : 0;
    const pendientesFinalizados = finalizados ? JSON.parse(finalizados).length : 0;

    this.options = this.options.map(opt => {
      if (opt.route === '/firmar-documentos') {
        return { ...opt, pendientes: pendientesFirmar };
      }
      if (opt.route === '/ver-tramites') {
        return { ...opt, pendientes: pendientesVer };
      }
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
