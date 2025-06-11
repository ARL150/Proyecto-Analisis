import { Tramite } from "./tramite.model";

export interface Trabajador {
  id: number;
  nombre: string;
  tramites: Tramite[];
}