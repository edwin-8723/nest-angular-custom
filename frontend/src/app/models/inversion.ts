export interface Inversion {
  id: number;
  monto: number;
  tipo: string;
  user?: {
    id: number;
    email: string;
    name: string;
  };
}

export interface CreateInversion {
  monto: number;
  tipo: string;
}
