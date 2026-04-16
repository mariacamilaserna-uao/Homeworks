export interface Usuario {
  id: string
  correo: string
  nombre: string
}

export interface NodoArchivo {
  id: string
  nombre: string
  tipo: 'carpeta' | 'archivo'
  correoCreador: string
  fechaCreacion: Date
  hijos: NodoArchivo[]
  idPadre?: string
}

export interface ResultadoOperacion {
  exito: boolean
  mensaje: string
  dato?: unknown
}
