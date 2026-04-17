import { useState, useEffect } from 'react'
import ArbolBinarioB from './BinarySearchTree'
import { ArbolNario } from './NArioMenu'
import MenuLateral from './MenuLateral'
import './App.css'

function App() {
  const [arbol] = useState(new ArbolBinarioB())
  const [buscar, setBuscar] = useState('')
  const [existe, setExiste] = useState<boolean | null>(null)
  const [menuArbol] = useState<ArbolNario>(() => {
    const arbolMenu = new ArbolNario({
      titulo: 'Menu',
      enlace: '#inicio',
      componente: 'MenuPrincipal'
    })

    // Crear nodos principales
    const raiz = arbolMenu.obtenerRaiz()!

    // Nodo: Profile
    arbolMenu.agregarNodo(raiz, {
      titulo: 'Profile',
      enlace: '#profile',
      componente: 'Profile'
    })

    // Nodo: Messages
    arbolMenu.agregarNodo(raiz, {
      titulo: 'Messages',
      enlace: '#messages',
      componente: 'Messages'
    })

    // Nodo: Settings (con submenús)
    const nodoSettings = arbolMenu.agregarNodo(raiz, {
      titulo: 'Settings',
      enlace: '#settings',
      componente: 'Settings'
    })

    arbolMenu.agregarNodo(nodoSettings, {
      titulo: 'Account',
      enlace: '#settings/account',
      componente: 'Account'
    })

    arbolMenu.agregarNodo(nodoSettings, {
      titulo: 'Profile',
      enlace: '#settings/profile',
      componente: 'SettingsProfile'
    })

    arbolMenu.agregarNodo(nodoSettings, {
      titulo: 'Security & Privacy',
      enlace: '#settings/security',
      componente: 'Security'
    })

    arbolMenu.agregarNodo(nodoSettings, {
      titulo: 'Password',
      enlace: '#settings/password',
      componente: 'Password'
    })

    arbolMenu.agregarNodo(nodoSettings, {
      titulo: 'Notification',
      enlace: '#settings/notification',
      componente: 'Notification'
    })

    // Nodo: Help (con submenús)
    const nodoHelp = arbolMenu.agregarNodo(raiz, {
      titulo: 'Help',
      enlace: '#help',
      componente: 'Help'
    })

    arbolMenu.agregarNodo(nodoHelp, {
      titulo: "FAQ's",
      enlace: '#help/faqs',
      componente: 'FAQs'
    })

    arbolMenu.agregarNodo(nodoHelp, {
      titulo: 'Submit a Ticket',
      enlace: '#help/ticket',
      componente: 'SupportTicket'
    })

    arbolMenu.agregarNodo(nodoHelp, {
      titulo: 'Network Status',
      enlace: '#help/status',
      componente: 'NetworkStatus'
    })

    // Nodo: Logout
    arbolMenu.agregarNodo(raiz, {
      titulo: 'Logout',
      enlace: '#logout',
      componente: 'Logout'
    })

    // Imprimir el árbol en consola
    console.log('=== Árbol N-ario de Menús ===')
    arbolMenu.imprimir()
    console.log('Recorrido por niveles:', arbolMenu.recorridoNiveles())
    console.log('Recorrido en profundidad:', arbolMenu.recorridoProfundidad())

    return arbolMenu
  })

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
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <MenuLateral raiz={menuArbol.obtenerRaiz()} />
      
      <section id="center" style={{ flex: 1, padding: '40px' }}>
        <div>
          <h1>Arbol binario de busqueda</h1>
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

        <div style={{ marginTop: '40px', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
          <h2>Informacion del arbol N-ario de menus</h2>
          <p><strong>Total de elementos:</strong> {menuArbol.obtenerTodosLosNodos().length}</p>
          <p><strong>Elementos principales:</strong> {menuArbol.obtenerRaiz()?.hijos.length || 0}</p>
        </div>
      </section>
    </div>
  )
}

export default App
