import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { ClienteInicio } from './components/cliente-inicio/cliente-inicio'; // <-- agrega esto

import { AsignarDocumentosComponent } from './components/asignar-documentos/asignar-documentos';
import { AgendarDocumentos } from './components/agendar-documentos/agendar-documentos';
import { FirmarDocumentos } from './components/firmar-documentos/firmar-documentos';
import { Tramites } from './components/tramites/tramites';
import { AuthGuard } from './guards/auth-guard';
import { VerTramites } from './components/ver-tramites/ver-tramites';
import { DocumentosFinalizados } from './components/documentos-finalizados/documentos-finalizados';
import { NuevoTramite } from './components/nuevo-tramite/nuevo-tramite';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
  { path: 'agendar-documentos', component: AgendarDocumentos, canActivate: [AuthGuard] },
  { path: 'firmar-documentos', component: FirmarDocumentos, canActivate: [AuthGuard] },
  { path: 'asignar-documentos', component: AsignarDocumentosComponent, canActivate: [AuthGuard] },
  { path: 'tramites', component: Tramites, canActivate: [AuthGuard] },
  { path: 'ver-tramites', component: VerTramites, canActivate: [AuthGuard]},
  { path: 'documentos-finalizados', component: DocumentosFinalizados, canActivate: [AuthGuard] },
  { path: 'cliente', component: ClienteInicio, canActivate: [AuthGuard] }, 
  { path: 'nuevo-tramite', component: NuevoTramite, canActivate: [AuthGuard] },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
