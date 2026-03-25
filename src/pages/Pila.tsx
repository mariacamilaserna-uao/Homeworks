import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { PilaLibros, generarDatosEjemplo } from '../tiposPila'
import './Pila.css'

export function Pila() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const [pila] = useState(() => {
    const p = new PilaLibros()
    const ejemplos = generarDatosEjemplo()
    ejemplos.forEach((libro) => p.agregarLibro(libro))
    return p
  })

  const [nombre, setNombre] = useState('')
  const [isbn, setIsbn] = useState('')
  const [autor, setAutor] = useState('')
  const [editorial, setEditorial] = useState('')
  const [libros, setLibros] = useState(pila.obtenerTodos())

  const manejarAgregarLibro = (e: React.FormEvent) => {
    e.preventDefault()
    if (nombre && isbn && autor && editorial) {
      pila.agregarLibro({ nombre, isbn, autor, editorial })
      setLibros([...pila.obtenerTodos()])
      setNombre('')
      setIsbn('')
      setAutor('')
      setEditorial('')
    }
  }

  const manejarSacarLibro = () => {
    pila.sacarLibro()
    setLibros([...pila.obtenerTodos()])
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="pila-wrapper">
      <header className="pila-header">
        <h1>Pila de Libros</h1>
        <div className="header-right">
          <span className="usuario-info">Usuario: {user?.username}</span>
          <button onClick={handleLogout} className="logout-btn-pila">
            Cerrar sesion
          </button>
        </div>
      </header>

      <div className="contenedor">
        <section className="seccion-formulario">
          <h2>Agregar Libro</h2>
          <form onSubmit={manejarAgregarLibro}>
            <input
              type="text"
              placeholder="Nombre del libro"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="ISBN"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Autor"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Editorial"
              value={editorial}
              onChange={(e) => setEditorial(e.target.value)}
              required
            />
            <button type="submit">Agregar Libro</button>
          </form>
        </section>

        <section className="seccion-libros">
          <div className="cabecera-libros">
            <h2>Libros en la Pila ({libros.length})</h2>
            {libros.length > 0 && (
              <button className="btn-sacar" onClick={manejarSacarLibro}>
                Sacar ultimo
              </button>
            )}
          </div>

          {libros.length === 0 ? (
            <div className="vacia">La pila esta vacia</div>
          ) : (
            <div className="lista-libros">
              {libros.map((libro, i) => (
                <div key={i} className="item-libro">
                  <div className="numero">{i + 1}</div>
                  <div className="info-libro">
                    <h3>{libro.nombre}</h3>
                    <p>
                      <strong>ISBN:</strong> {libro.isbn}
                    </p>
                    <p>
                      <strong>Autor:</strong> {libro.autor}
                    </p>
                    <p>
                      <strong>Editorial:</strong> {libro.editorial}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
