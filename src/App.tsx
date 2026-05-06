import { useMemo, useState } from 'react'
import './App.css'

type Producto = {
  nombre: string
  popularidad: number
}

type NodoTrie = {
  hijos: Record<string, NodoTrie>
  fin: boolean
  item?: Producto
}

class MinHeap {
  items: Producto[] = []
  limite: number
  constructor(limite: number) {
    this.limite = limite
  }
  agregar(item: Producto) {
    if (this.items.length < this.limite) {
      this.items.push(item)
      this.siftUp(this.items.length - 1)
      return
    }
    if (item.popularidad <= this.items[0].popularidad) return
    this.items[0] = item
    this.siftDown(0)
  }
  toArray() {
    return [...this.items]
  }
  private siftUp(index: number) {
    while (index > 0) {
      const padre = Math.floor((index - 1) / 2)
      if (this.items[index].popularidad >= this.items[padre].popularidad) break
      this.swap(index, padre)
      index = padre
    }
  }
  private siftDown(index: number) {
    const n = this.items.length
    while (true) {
      let menor = index
      const izquierda = 2 * index + 1
      const derecha = 2 * index + 2
      if (
        izquierda < n &&
        this.items[izquierda].popularidad < this.items[menor].popularidad
      ) {
        menor = izquierda
      }
      if (
        derecha < n &&
        this.items[derecha].popularidad < this.items[menor].popularidad
      ) {
        menor = derecha
      }
      if (menor === index) break
      this.swap(index, menor)
      index = menor
    }
  }
  private swap(a: number, b: number) {
    const temp = this.items[a]
    this.items[a] = this.items[b]
    this.items[b] = temp
  }
}

function crearTrie(lista: Producto[]) {
  const raiz: NodoTrie = { hijos: {}, fin: false }
  for (const producto of lista) {
    let nodo = raiz
    const texto = producto.nombre.toLowerCase()
    for (const letra of texto) {
      if (!nodo.hijos[letra]) nodo.hijos[letra] = { hijos: {}, fin: false }
      nodo = nodo.hijos[letra]
    }
    nodo.fin = true
    nodo.item = producto
  }
  return raiz
}

function buscarNodo(raiz: NodoTrie, prefijo: string) {
  let nodo = raiz
  for (const letra of prefijo) {
    nodo = nodo.hijos[letra]
    if (!nodo) return null
  }
  return nodo
}

function recolectar(nodo: NodoTrie, salida: Producto[]) {
  if (nodo.fin && nodo.item) salida.push(nodo.item)
  for (const hijo of Object.values(nodo.hijos)) {
    recolectar(hijo, salida)
  }
}

function searchTopK(raiz: NodoTrie, prefijo: string, k: number) {
  const nodo = buscarNodo(raiz, prefijo.toLowerCase())
  if (!nodo) return []
  const todos: Producto[] = []
  recolectar(nodo, todos)
  const heap = new MinHeap(k)
  for (const item of todos) heap.agregar(item)
  return heap.toArray().sort((a, b) => b.popularidad - a.popularidad)
}

const productosBase: Producto[] = [
  { nombre: 'air max', popularidad: 90 },
  { nombre: 'air force', popularidad: 95 },
  { nombre: 'air jordan', popularidad: 85 },
  { nombre: 'adidas boost', popularidad: 80 },
  { nombre: 'nike pegasus', popularidad: 70 },
  { nombre: 'reebok nano', popularidad: 60 },
]

function App() {
  const [query, setQuery] = useState('air')
  const trie = useMemo(() => crearTrie(productosBase), [])
  const resultados = searchTopK(trie, query.trim(), 3)

  return (
    <main className="app">
      <section className="card">
        <div>
          <h1 className="title">buscador inteligente</h1>
          <p className="subtitulo">escribe un prefijo y mira los mejores</p>
        </div>
        <input
          className="input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ej: air"
        />
        <div className="resultado">
          <span>top {resultados.length} productos</span>
        </div>
        <ul className="list">
          {resultados.length === 0 ? (
            <li className="empty">no hay resultados</li>
          ) : (
            resultados.map((item) => (
              <li key={item.nombre} className="item">
                <span>{item.nombre}</span>
                <span>{item.popularidad}</span>
              </li>
            ))
          )}
        </ul>
      </section>
    </main>
  )
}

export default App
