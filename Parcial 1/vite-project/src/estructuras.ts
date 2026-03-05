import type { NodeoSimple, NodoDoblemente } from './types';

export class ListaEnlazada<T> {
  private cabeza: NodeoSimple<T> | null = null;

  agregar(dato: T): void {
    const nodo: NodeoSimple<T> = { dato, siguiente: null };
    if (!this.cabeza) {
      this.cabeza = nodo;
    } else {
      let actual = this.cabeza;
      while (actual.siguiente) {
        actual = actual.siguiente;
      }
      actual.siguiente = nodo;
    }
  }

  obtener(): T[] {
    const resultado: T[] = [];
    let actual = this.cabeza;
    while (actual) {
      resultado.push(actual.dato);
      actual = actual.siguiente;
    }
    return resultado;
  }

  eliminar(comparar: (item: T) => boolean): void {
    if (!this.cabeza) return;

    if (comparar(this.cabeza.dato)) {
      this.cabeza = this.cabeza.siguiente;
      return;
    }

    let actual = this.cabeza;
    while (actual.siguiente) {
      if (comparar(actual.siguiente.dato)) {
        actual.siguiente = actual.siguiente.siguiente;
        return;
      }
      actual = actual.siguiente;
    }
  }
}

export class ListaDoblementEnlazada<T> {
  private cabeza: NodoDoblemente<T> | null = null;
  private cola: NodoDoblemente<T> | null = null;

  agregar(dato: T): void {
    const nodo: NodoDoblemente<T> = { dato, siguiente: null, anterior: null };
    if (!this.cabeza) {
      this.cabeza = nodo;
      this.cola = nodo;
    } else {
      if (this.cola) {
        this.cola.siguiente = nodo;
        nodo.anterior = this.cola;
      }
      this.cola = nodo;
    }
  }

  obtener(): T[] {
    const resultado: T[] = [];
    let actual = this.cabeza;
    while (actual) {
      resultado.push(actual.dato);
      actual = actual.siguiente;
    }
    return resultado;
  }
}

export class ListaCircular<T> {
  private cabeza: { dato: T; siguiente: any } | null = null;
  private actual: { dato: T; siguiente: any } | null = null;

  agregar(dato: T): void {
    const nodo: any = { dato, siguiente: null };
    if (!this.cabeza) {
      nodo.siguiente = nodo;
      this.cabeza = nodo;
      this.actual = nodo;
    } else {
      let temp = this.cabeza;
      while (temp.siguiente !== this.cabeza) {
        temp = temp.siguiente;
      }
      nodo.siguiente = this.cabeza;
      temp.siguiente = nodo;

      if (!this.actual) this.actual = this.cabeza;
    }
  }

  obtener(): T[] {
    const resultado: T[] = [];
    if (!this.cabeza) return resultado;

    let temp = this.cabeza;
    do {
      resultado.push(temp.dato);
      temp = temp.siguiente;
    } while (temp !== this.cabeza);
    return resultado;
  }

  rotar(): T | null {
    if (!this.actual) return null;
    this.actual = this.actual.siguiente;
    return this.actual?.dato || null;
  }

  obtenerActual(): T | null {
    return this.actual?.dato || null;
  }
}


export class ListaCircularDoble<T> {
  private cabeza: any = null;
  private actual: any = null;

  agregar(dato: T): void {
    const nodo: any = {
      dato,
      siguiente: null,
      anterior: null,
    };

    if (!this.cabeza) {
      nodo.siguiente = nodo;
      nodo.anterior = nodo;
      this.cabeza = nodo;
      this.actual = nodo;
    } else {
      let temp = this.cabeza;
      while (temp.siguiente !== this.cabeza) {
        temp = temp.siguiente;
      }
      nodo.siguiente = this.cabeza;
      nodo.anterior = temp;
      this.cabeza.anterior = nodo;
      temp.siguiente = nodo;

      if (!this.actual) this.actual = this.cabeza;
    }
  }

  obtener(): T[] {
    const resultado: T[] = [];
    if (!this.cabeza) return resultado;

    let temp = this.cabeza;
    do {
      resultado.push(temp.dato);
      temp = temp.siguiente;
    } while (temp !== this.cabeza);
    return resultado;
  }

  rotar(): T | null {
    if (!this.actual) return null;
    this.actual = this.actual.siguiente;
    return this.actual?.dato || null;
  }

  obtenerActual(): T | null {
    return this.actual?.dato || null;
  }
}
