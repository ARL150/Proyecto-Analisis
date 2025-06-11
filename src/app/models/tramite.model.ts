export interface Tramite {
  nombre: string;
  descripcion: string;
  documentos: string[];
  interesado: {
    nombre: string;
    correo: string;
    telefono: string;
  };
}
