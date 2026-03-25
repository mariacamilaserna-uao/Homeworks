import type { Persona } from './tipos'

function generarFechaAleatoria(): Date {
  const ahora = new Date()
  const minutosAtras = Math.floor(Math.random() * 240)
  const segundosAtras = Math.floor(Math.random() * 60)

  const fecha = new Date(ahora)
  fecha.setMinutes(fecha.getMinutes() - minutosAtras)
  fecha.setSeconds(fecha.getSeconds() - segundosAtras)

  return fecha
}

function generarId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export function crearPersona(
  nombre: string,
  monto: number,
  fechaCustom?: Date
): Persona {
  return {
    id: generarId(),
    nombre,
    monto,
    fechaLlegada: fechaCustom || generarFechaAleatoria(),
  }
}

const ahora = new Date()

export const datosEjemplo: Persona[] = [
  crearPersona('Carlos', 500000, new Date(ahora.getTime() - 180 * 60000)),
  crearPersona('Maria', 250000, new Date(ahora.getTime() - 150 * 60000)),
  crearPersona('Juan', 1000000, new Date(ahora.getTime() - 120 * 60000)),
  crearPersona('Ana', 150000, new Date(ahora.getTime() - 90 * 60000)),
  crearPersona('Pedro', 750000, new Date(ahora.getTime() - 60 * 60000)),
  crearPersona('Laura', 300000, new Date(ahora.getTime() - 30 * 60000)),
]
