import { useState } from 'react'
import type { Persona } from './tipos'
import { datosEjemplo, crearPersona } from './datos'
import { Cola } from './componentes/Cola'
import { Formulario } from './componentes/Formulario'
import './App.css'

function App() {
  const [personas, setPersonas] = useState<Persona[]>(datosEjemplo)

  const agregarPersona = (nombre: string, monto: number) => {
    const nuevaPersona = crearPersona(nombre, monto)
    setPersonas([...personas, nuevaPersona])
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Cajero Automatico</h1>
      </header>

      <main className="app-main">
        <div className="contenedor-principal">
          <Formulario onAgregar={agregarPersona} />
          <Cola personas={personas} />
        </div>
      </main>
    </div>
  )
}

export default App

