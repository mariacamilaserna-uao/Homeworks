import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { Persona } from '../tipos'
import { datosEjemplo, crearPersona } from '../datos'
import { Formulario } from '../components/Formulario'
import { Cola } from '../components/Cola'
import './ColaPage.css'

export function ColaPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [personas, setPersonas] = useState<Persona[]>(datosEjemplo)

  const agregarPersona = (nombre: string, monto: number) => {
    const nuevaPersona = crearPersona(nombre, monto)
    setPersonas([...personas, nuevaPersona])
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="cola-page-wrapper">
      <header className="cola-page-header">
        <h1>Cajero Automatico</h1>
        <div className="header-right">
          <span className="usuario-info">Usuario: {user?.username}</span>
          <button onClick={handleLogout} className="logout-btn-cola">
            Cerrar sesion
          </button>
        </div>
      </header>

      <main className="cola-page-main">
        <div className="contenedor-principal">
          <Formulario onAgregar={agregarPersona} />
          <Cola personas={personas} />
        </div>
      </main>
    </div>
  )
}
