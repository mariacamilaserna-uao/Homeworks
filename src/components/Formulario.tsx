import { useState } from 'react'
import './Formulario.css'

interface FormularioProps {
  onAgregar: (nombre: string, monto: number) => void
}

export function Formulario({ onAgregar }: FormularioProps) {
  const [nombre, setNombre] = useState('')
  const [monto, setMonto] = useState('')
  const [error, setError] = useState('')
  const [exito, setExito] = useState('')

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setExito('')

    if (!nombre.trim()) {
      setError('El nombre es requerido')
      return
    }

    const montoNum = parseInt(monto)
    if (!monto || montoNum <= 0) {
      setError('El monto debe ser un numero mayor a 0')
      return
    }

    onAgregar(nombre.trim(), montoNum)
    setExito(`${nombre} agregado a la cola`)
    setNombre('')
    setMonto('')

    setTimeout(() => setExito(''), 3000)
  }

  return (
    <form onSubmit={manejarEnvio} className="formulario">
      <h3>Agregar Persona a la Cola</h3>

      <div className="campo">
        <label htmlFor="nombre">Nombre:</label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Carlos"
        />
      </div>

      <div className="campo">
        <label htmlFor="monto">Monto a retirar:</label>
        <input
          id="monto"
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          placeholder="Ej: 500000"
          min="1"
        />
      </div>

      {error && <p className="error">{error}</p>}
      {exito && <p className="exito">{exito}</p>}

      <button type="submit" className="boton">
        Agregar a la Cola
      </button>
    </form>
  )
}
