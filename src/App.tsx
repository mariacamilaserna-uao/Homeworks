import { useState, useEffect } from 'react'
import ArbolBinarioB from './BinarySearchTree'
import './App.css'

function App() {
  const [arbol] = useState(new ArbolBinarioB())
  const [buscar, setBuscar] = useState('')
  const [existe, setExiste] = useState<boolean | null>(null)

  useEffect(() => {
    const numeros = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 65]
    numeros.forEach(num => arbol.insertar(num))

    console.log('Numeros insertados:', numeros)
    arbol.imprimir('ascendente')
    arbol.imprimir('descendente')
  }, [arbol])

  const manejarBusqueda = () => {
    const valor = parseInt(buscar)
    if (!isNaN(valor)) {
      setExiste(arbol.existe(valor))
      console.log(`Buscando ${valor}:`, arbol.existe(valor))
    }
  }

  return (
    <>
      <section id="center">
        <div>
          <h1>Arbol Binario de Busqueda</h1>
          <p>recorridos(50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 65)</p>
        </div>

        <div style={{ marginTop: '20px' }}>
          <h2>Buscar un valor</h2>
          <input
            type="number"
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
            placeholder="Ingresa un numero"
          />
          <button onClick={manejarBusqueda}>Buscar</button>
          
          {existe !== null && (
            <p style={{ marginTop: '10px' }}>
              {existe ? 'Si, esta en el arbol' : 'No, no esta en el arbol'}
            </p>
          )}
        </div>
      </section>
    </>
  )
}

export default App
