import { ListaEnlazada, ListaDoblementEnlazada, ListaCircular, ListaCircularDoble } from './estructuras';
import type { Vehículo, Alquiler, Inversionista } from './types';

export class SistemaMovilidad {
  vehículosDisponibles: ListaEnlazada<Vehículo>;
  historialAlquileres: ListaDoblementEnlazada<Alquiler>;
  vehículosDestacados: ListaCircular<Vehículo>;
  inversionistas: ListaCircularDoble<Inversionista>;

  constructor() {
    this.vehículosDisponibles = new ListaEnlazada();
    this.historialAlquileres = new ListaDoblementEnlazada();
    this.vehículosDestacados = new ListaCircular();
    this.inversionistas = new ListaCircularDoble();
  }

  agregarVehículo(vehículo: Vehículo): void {
    this.vehículosDisponibles.agregar(vehículo);
    this.vehículosDestacados.agregar(vehículo);
  }

  alquilarVehículo(vehículo: Vehículo, cliente: string): void {
    this.vehículosDisponibles.eliminar((v) => v.id === vehículo.id);
    const alquiler: Alquiler = {
      id: Date.now().toString(),
      vehículo,
      fecha: new Date(),
      cliente,
      diasAlquiler: 1,
      costoTotal: vehículo.precioDiario,
    };
    this.historialAlquileres.agregar(alquiler);
  }

  alquilarVehículoConCosto(vehículo: Vehículo, cliente: string, diasAlquiler: number, costoTotal: number): void {
    this.vehículosDisponibles.eliminar((v) => v.id === vehículo.id);
    const alquiler: Alquiler = {
      id: Date.now().toString(),
      vehículo,
      fecha: new Date(),
      cliente,
      diasAlquiler,
      costoTotal,
    };
    this.historialAlquileres.agregar(alquiler);
  }

  agregarInversionista(inversionista: Inversionista): void {
    this.inversionistas.agregar(inversionista);
  }

  rotarDestacado(): Vehículo | null {
    return this.vehículosDestacados.rotar();
  }

  getVehículosDisponibles(): Vehículo[] {
    return this.vehículosDisponibles.obtener();
  }

  getHistorial(): Alquiler[] {
    return this.historialAlquileres.obtener();
  }

  getDestacado(): Vehículo | null {
    return this.vehículosDestacados.obtenerActual();
  }

  getInversionistas(): Inversionista[] {
    return this.inversionistas.obtener();
  }
}
