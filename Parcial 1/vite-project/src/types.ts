export interface Vehículo {
  id: string;
  placa: string;
  modelo: string;
  marca: string;
  precioDiario: number;
  categoria: string;
}

export interface NodeoSimple<T> {
  dato: T;
  siguiente: NodeoSimple<T> | null;
}

export interface NodoDoblemente<T> {
  dato: T;
  siguiente: NodoDoblemente<T> | null;
  anterior: NodoDoblemente<T> | null;
}

export interface Alquiler {
  id: string;
  vehículo: Vehículo;
  fecha: Date;
  cliente: string;
  diasAlquiler: number;
  costoTotal: number;
}

export interface Inversionista {
  id: string;
  nombre: string;
  porcentaje: number;
}

export interface NodoCircular<T> {
  dato: T;
  siguiente: NodoCircular<T>;
}
