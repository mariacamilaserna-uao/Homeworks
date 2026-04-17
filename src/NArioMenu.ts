// Interfaz para cada elemento del menú
interface ElementoMenu {
  titulo: string
  enlace: string
  componente: string
}

// Clase para cada nodo del árbol N-ario
class NodoMenu {
  elemento: ElementoMenu
  hijos: NodoMenu[] = []

  constructor(elemento: ElementoMenu) {
    this.elemento = elemento
  }

  agregarHijo(nodo: NodoMenu) {
    this.hijos.push(nodo)
  }

  obtenerHijos(): NodoMenu[] {
    return this.hijos
  }
}

// Clase para el árbol N-ario
class ArbolNario {
  raiz: NodoMenu | null = null

  constructor(elementoRaiz?: ElementoMenu) {
    if (elementoRaiz) {
      this.raiz = new NodoMenu(elementoRaiz)
    }
  }

  setRaiz(elemento: ElementoMenu) {
    this.raiz = new NodoMenu(elemento)
  }

  obtenerRaiz(): NodoMenu | null {
    return this.raiz
  }

  // Método para agregar un hijo a un nodo específico
  agregarNodo(padre: NodoMenu, elemento: ElementoMenu): NodoMenu {
    const nuevoNodo = new NodoMenu(elemento)
    padre.agregarHijo(nuevoNodo)
    return nuevoNodo
  }

  // Recorrido por niveles (BFS)
  recorridoNiveles(): ElementoMenu[] {
    const resultado: ElementoMenu[] = []
    if (this.raiz === null) return resultado

    const cola: NodoMenu[] = [this.raiz]
    while (cola.length > 0) {
      const nodo = cola.shift()
      if (nodo) {
        resultado.push(nodo.elemento)
        cola.push(...nodo.hijos)
      }
    }
    return resultado
  }

  // Recorrido en profundidad (DFS)
  recorridoProfundidad(): ElementoMenu[] {
    const resultado: ElementoMenu[] = []
    this.recorridoProfundidadRecursivo(this.raiz, resultado)
    return resultado
  }

  private recorridoProfundidadRecursivo(nodo: NodoMenu | null, resultado: ElementoMenu[]) {
    if (nodo === null) return
    resultado.push(nodo.elemento)
    for (const hijo of nodo.hijos) {
      this.recorridoProfundidadRecursivo(hijo, resultado)
    }
  }

  // Obtener todos los nodos en un array
  obtenerTodosLosNodos(): NodoMenu[] {
    const resultado: NodoMenu[] = []
    this.obtenerNodosRecursivo(this.raiz, resultado)
    return resultado
  }

  private obtenerNodosRecursivo(nodo: NodoMenu | null, resultado: NodoMenu[]) {
    if (nodo === null) return
    resultado.push(nodo)
    for (const hijo of nodo.hijos) {
      this.obtenerNodosRecursivo(hijo, resultado)
    }
  }

  // Imprimir el árbol en consola
  imprimir() {
    console.log('=== Árbol N-ario de Menús ===')
    this.imprimirRecursivo(this.raiz, 0)
  }

  private imprimirRecursivo(nodo: NodoMenu | null, nivel: number) {
    if (nodo === null) return
    const indentacion = '  '.repeat(nivel)
    console.log(`${indentacion}├─ ${nodo.elemento.titulo} (${nodo.elemento.enlace})`)
    for (const hijo of nodo.hijos) {
      this.imprimirRecursivo(hijo, nivel + 1)
    }
  }
}

export { ArbolNario, NodoMenu }
export type { ElementoMenu }
