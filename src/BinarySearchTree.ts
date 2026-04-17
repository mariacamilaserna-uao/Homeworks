class Nodo {
  valor: number
  izquierdo: Nodo | null = null
  derecho: Nodo | null = null

  constructor(valor: number) {
    this.valor = valor
  }
}

class ArbolBinarioB {
  raiz: Nodo | null = null

  insertar(valor: number) {
    if (this.raiz === null) {
      this.raiz = new Nodo(valor)
    } else {
      this.insertarRecursivo(this.raiz, valor)
    }
  }

  private insertarRecursivo(nodo: Nodo, valor: number) {
    if (valor < nodo.valor) {
      if (nodo.izquierdo === null) {
        nodo.izquierdo = new Nodo(valor)
      } else {
        this.insertarRecursivo(nodo.izquierdo, valor)
      }
    } else {
      if (nodo.derecho === null) {
        nodo.derecho = new Nodo(valor)
      } else {
        this.insertarRecursivo(nodo.derecho, valor)
      }
    }
  }

  imprimir(tipo: 'ascendente' | 'descendente') {
    const resultado: number[] = []
    if (tipo === 'ascendente') {
      this.recorridoInorden(this.raiz, resultado)
    } else {
      this.recorridoInordenInverso(this.raiz, resultado)
    }
    console.log(`Orden ${tipo}:`, resultado)
  }

  private recorridoInorden(nodo: Nodo | null, resultado: number[]) {
    if (nodo === null) return
    this.recorridoInorden(nodo.izquierdo, resultado)
    resultado.push(nodo.valor)
    this.recorridoInorden(nodo.derecho, resultado)
  }

  private recorridoInordenInverso(nodo: Nodo | null, resultado: number[]) {
    if (nodo === null) return
    this.recorridoInordenInverso(nodo.derecho, resultado)
    resultado.push(nodo.valor)
    this.recorridoInordenInverso(nodo.izquierdo, resultado)
  }

  existe(valor: number): boolean {
    return this.existeRecursivo(this.raiz, valor)
  }

  private existeRecursivo(nodo: Nodo | null, valor: number): boolean {
    if (nodo === null) {
      return false
    }
    if (valor === nodo.valor) {
      return true
    }
    if (valor < nodo.valor) {
      return this.existeRecursivo(nodo.izquierdo, valor)
    } else {
      return this.existeRecursivo(nodo.derecho, valor)
    }
  }
}

export default ArbolBinarioB
