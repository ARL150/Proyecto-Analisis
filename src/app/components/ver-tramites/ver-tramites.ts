import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

interface Trabajador {
  id: number;
  nombre: string;
  tramites: Tramite[];
}

@Component({
  selector: 'app-ver-tramites',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ver-tramites.html',
  styleUrls: ['./ver-tramites.css']
})
export class VerTramites implements OnInit {
  tramitesPorTrabajador: Record<number, Tramite[]> = {};
  nombresTrabajadores: Record<number, string> = {};
  trabajadorIds: number[] = [];
  editando: { [trabajadorId: number]: number | null } = {};
  tramiteOriginal: { [trabajadorId: number]: Tramite | null } = {};

  ngOnInit(): void {
    const data = localStorage.getItem('trabajadores');
    if (data) {
      const trabajadores: Trabajador[] = JSON.parse(data);
      for (const trabajador of trabajadores) {
        this.tramitesPorTrabajador[trabajador.id] = trabajador.tramites || [];
        this.nombresTrabajadores[trabajador.id] = trabajador.nombre;
        this.editando[trabajador.id] = null;
        this.tramiteOriginal[trabajador.id] = null;
      }
      this.trabajadorIds = Object.keys(this.tramitesPorTrabajador).map(Number);
    }
  }

  editarTramite(trabajadorId: number, index: number): void {
    this.editando[trabajadorId] = index;
    this.tramiteOriginal[trabajadorId] = JSON.parse(JSON.stringify(this.tramitesPorTrabajador[trabajadorId][index]));
  }

  guardarTramite(trabajadorId: number, index: number): void {
    const tramiteEditado = this.tramitesPorTrabajador[trabajadorId][index];
    const tramiteAnterior = this.tramiteOriginal[trabajadorId];

    const data = localStorage.getItem('trabajadores');
    if (data) {
      const trabajadores: Trabajador[] = JSON.parse(data);
      const trabajador = trabajadores.find(t => t.id === trabajadorId);
      if (trabajador) {
        trabajador.tramites[index] = tramiteEditado;
        localStorage.setItem('trabajadores', JSON.stringify(trabajadores));
      }
    }

    const globalData = localStorage.getItem('tramitesAsignados');
    if (globalData && tramiteAnterior) {
      let globalTramites: Tramite[] = JSON.parse(globalData);
      const indexOriginal = globalTramites.findIndex(t => this.esMismoTramite(t, tramiteAnterior));
      if (indexOriginal !== -1) {
        globalTramites[indexOriginal] = tramiteEditado;
        localStorage.setItem('tramitesAsignados', JSON.stringify(globalTramites));
      }
    }

    this.editando[trabajadorId] = null;
    this.tramiteOriginal[trabajadorId] = null;
    Swal.fire('Actualizado', 'El trámite fue actualizado correctamente.', 'success');
  }

  eliminarTramite(trabajadorId: number, index: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el trámite definitivamente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        const tramiteEliminado = this.tramitesPorTrabajador[trabajadorId][index];
        this.tramitesPorTrabajador[trabajadorId].splice(index, 1);

        const data = localStorage.getItem('trabajadores');
        if (data) {
          const trabajadores: Trabajador[] = JSON.parse(data);
          const trabajador = trabajadores.find(t => t.id === trabajadorId);
          if (trabajador) {
            trabajador.tramites.splice(index, 1);
            localStorage.setItem('trabajadores', JSON.stringify(trabajadores));
          }
        }

        const globalData = localStorage.getItem('tramitesAsignados');
        if (globalData) {
          let globalTramites: Tramite[] = JSON.parse(globalData);
          globalTramites = globalTramites.filter(t => !this.esMismoTramite(t, tramiteEliminado));
          localStorage.setItem('tramitesAsignados', JSON.stringify(globalTramites));
        }

        if (this.tramitesPorTrabajador[trabajadorId].length === 0) {
          delete this.tramitesPorTrabajador[trabajadorId];
          delete this.nombresTrabajadores[trabajadorId];
          delete this.editando[trabajadorId];
          this.trabajadorIds = Object.keys(this.tramitesPorTrabajador).map(Number);
        }

        Swal.fire('Eliminado', 'El trámite fue eliminado.', 'success');
      }
    });
  }

  enviarAFirma(trabajadorId: number, index: number): void {
    const tramite = this.tramitesPorTrabajador[trabajadorId][index];

    const dataFirma = localStorage.getItem('tramitesParaFirmar');
    const paraFirmar: Tramite[] = dataFirma ? JSON.parse(dataFirma) : [];
    paraFirmar.push(tramite);
    localStorage.setItem('tramitesParaFirmar', JSON.stringify(paraFirmar));

    this.tramitesPorTrabajador[trabajadorId].splice(index, 1);

    const dataTrab = localStorage.getItem('trabajadores');
    if (dataTrab) {
      const trabajadores: Trabajador[] = JSON.parse(dataTrab);
      const trabajador = trabajadores.find(t => t.id === trabajadorId);
      if (trabajador) {
        trabajador.tramites.splice(index, 1);
        localStorage.setItem('trabajadores', JSON.stringify(trabajadores));
      }
    }

    const dataGlobal = localStorage.getItem('tramitesAsignados');
    if (dataGlobal) {
      let globalTramites: Tramite[] = JSON.parse(dataGlobal);
      globalTramites = globalTramites.filter(t => !this.esMismoTramite(t, tramite));
      localStorage.setItem('tramitesAsignados', JSON.stringify(globalTramites));
    }

    if (this.tramitesPorTrabajador[trabajadorId].length === 0) {
      delete this.tramitesPorTrabajador[trabajadorId];
      delete this.nombresTrabajadores[trabajadorId];
      delete this.editando[trabajadorId];
      this.trabajadorIds = Object.keys(this.tramitesPorTrabajador).map(Number);
    }

    Swal.fire('Enviado', 'El trámite ha sido enviado para firma.', 'success');
  }

  esMismoTramite(a: Tramite, b: Tramite): boolean {
    return (
      a.nombre === b.nombre &&
      a.descripcion === b.descripcion &&
      a.interesado.nombre === b.interesado.nombre &&
      a.interesado.correo === b.interesado.correo &&
      a.interesado.telefono === b.interesado.telefono
    );
  }
}
