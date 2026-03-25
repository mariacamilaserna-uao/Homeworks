import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Home.css'

export function Home() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Hola {user?.username}</h1>
        <button onClick={handleLogout} className="logout-btn">
          Cerrar sesion
        </button>
      </header>

      <main className="home-main">
        <section className="welcome-section">
          <h2>Bienvenido a los ejercicios</h2>
          <p>Selecciona uno de los ejercicios para practicar</p>
        </section>

        <div className="exercises-grid">
          <div className="exercise-card">
            <h3>Pila de Libros</h3>
            <p>Practica con estructuras de datos tipo Pila (LIFO)</p>
            <button 
              onClick={() => navigate('/pila')}
              className="exercise-btn"
            >
              Ir al ejercicio
            </button>
          </div>

          <div className="exercise-card">
            <h3>Cajero Automatico</h3>
            <p>Aprende sobre colas y sistema FIFO</p>
            <button 
              onClick={() => navigate('/cola')}
              className="exercise-btn"
            >
              Ir al ejercicio
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
