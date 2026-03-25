import type { Persona } from '../tipos'
import './Cola.css'

interface ColaProps {
  personas: Persona[]
}

export function Cola({ personas }: ColaProps) {
  const personasOrdenadas = [...personas].sort(
    (a, b) => a.fechaLlegada.getTime() - b.fechaLlegada.getTime()
  )

  const formatearFecha = (fecha: Date) => {
    const horas = fecha.getHours().toString().padStart(2, '0')
    const minutos = fecha.getMinutes().toString().padStart(2, '0')
    const segundos = fecha.getSeconds().toString().padStart(2, '0')
    return `${horas}:${minutos}:${segundos}`
  }

  const calcularTiempoEspera = (fechaLlegada: Date) => {
    const ahora = new Date()
    const tiempoMs = ahora.getTime() - fechaLlegada.getTime()
    const minutos = Math.floor(tiempoMs / 60000)
    const segundos = Math.floor((tiempoMs % 60000) / 1000)

    if (minutos > 0) {
      return `${minutos} min ${segundos} seg`
    }
    return `${segundos} seg`
  }

  return (
    <div className="cola-container">
      <h2>Cola del Cajero</h2>
      <p className="total-personas">Total en cola: {personasOrdenadas.length}</p>
      {personasOrdenadas.length === 0 ? (
        <p className="cola-vacia">No hay personas en la cola</p>
      ) : (
        <ul className="cola-lista">
          {personasOrdenadas.map((persona, indice) => (
            <li key={persona.id} className="cola-item">
              <span className="posicion">#{indice + 1}</span>
              <div className="info">
                <strong>{persona.nombre}</strong>
                <p className="monto">
                  ${persona.monto.toLocaleString('es-CO')}
                </p>
              </div>
              <div className="tiempos">
                <span className="hora">
                  {formatearFecha(persona.fechaLlegada)}
                </span>
                <span className="espera">
                  Espera: {calcularTiempoEspera(persona.fechaLlegada)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
