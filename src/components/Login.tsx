import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import '../styles/Login.css'

export const Login = () => {
  const { login, registro } = useAuth()
  const [esRegistro, setEsRegistro] = useState(false)
  const [correo, setCorreo] = useState('')
  const [nombre, setNombre] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setCargando(true)

    try {
      if (esRegistro) {
        await registro(correo, nombre, contrasena)
      } else {
        await login(correo, contrasena)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>{esRegistro ? 'Registrarse' : 'Iniciar Sesion'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="correo">Correo Electronico:</label>
            <input
              id="correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="tu@email.com"
              disabled={cargando}
              required
            />
          </div>

          {esRegistro && (
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre"
                disabled={cargando}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="contrasena">Contrasena:</label>
            <input
              id="contrasena"
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="Minimo 6 caracteres"
              disabled={cargando}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={cargando} className="btn-submit">
            {cargando ? 'Cargando...' : esRegistro ? 'Registrarse' : 'Entrar'}
          </button>
        </form>

        <p className="auth-toggle">
          {esRegistro ? '¿Ya tienes cuenta? ' : '¿No tienes cuenta? '}
          <button
            type="button"
            onClick={() => {
              setEsRegistro(!esRegistro)
              setError('')
              setCorreo('')
              setNombre('')
              setContrasena('')
            }}
            disabled={cargando}
          >
            {esRegistro ? 'Inicia sesion' : 'Registrate'}
          </button>
        </p>
      </div>
    </div>
  )
}
