export interface Books {
  id?: string;
  titulo: string;
  descripcion: string;
  precio: number;
  fechaPublicacion?: Date;
  autor: AutorBook;
}

interface AutorBook {
  id: string;
}
