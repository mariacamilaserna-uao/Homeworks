import {
  createContext,
  useState,
  type ReactNode,
  useContext,
  useEffect,
} from 'react'
import { ref, set, get } from 'firebase/database'
import { database } from '../services/firebase'
import { type NodoArchivo, type ResultadoOperacion } from '../types'
import { useAuth } from './AuthContext'

interface FileContextType {
  arbol: NodoArchivo | null
  crearCarpeta: (nombre: string, idPadre?: string) => Promise<ResultadoOperacion>
  crearArchivo: (nombre: string, idPadre?: string) => Promise<ResultadoOperacion>
  eliminarNodo: (id: string) => Promise<ResultadoOperacion>
  obtenerNodoPorId: (id: string) => NodoArchivo | null
  cargandoArbol: boolean
}

const FileContext = createContext<FileContextType | undefined>(undefined)

const generarId = () => Math.random().toString(36).substring(7)

const buscarNodoPorId = (nodo: NodoArchivo, id: string): NodoArchivo | null => {
  if (nodo.id === id) return nodo

  for (const hijo of nodo.hijos) {
    const resultado = buscarNodoPorId(hijo, id)
    if (resultado) return resultado
  }

  return null
}

const eliminarNodoPorId = (
  nodo: NodoArchivo,
  id: string
): { exito: boolean; arbol: NodoArchivo } => {
  if (nodo.id === id) {
    return { exito: false, arbol: nodo }
  }

  nodo.hijos = nodo.hijos.filter((hijo: NodoArchivo) => {
    if (hijo.id === id) {
      return false
    }
    return true
  })

  for (const hijo of nodo.hijos) {
    if (buscarNodoPorId(hijo, id)) {
      const resultado = eliminarNodoPorId(hijo, id)
      if (!resultado.exito) {
        return { exito: true, arbol: nodo }
      }
    }
  }

  return { exito: false, arbol: nodo }
}

export const FileProvider = ({ children }: { children: ReactNode }) => {
  const { usuarioActual, estaAutenticado } = useAuth()
  const [arbol, setArbol] = useState<NodoArchivo | null>(null)
  const [cargandoArbol, setCargandoArbol] = useState(true)

  useEffect(() => {
    if (!estaAutenticado || !usuarioActual) {
      setArbol(null)
      setCargandoArbol(false)
      return
    }

    const cargarArbol = async () => {
      try {
        const refArbol = ref(database, `usuarios/${usuarioActual.id}/arbol`)
        const snapshot = await get(refArbol)

        if (snapshot.exists()) {
          const arbolCargado = snapshot.val()
          setArbol(arbolCargado)
        } else {
          inicializarArbolVacio()
        }
      } catch (error) {
        console.error('Error al cargar el arbol:', error)
        inicializarArbolVacio()
      } finally {
        setCargandoArbol(false)
      }
    }

    cargarArbol()
  }, [estaAutenticado, usuarioActual])

  const inicializarArbolVacio = async () => {
    const arbolRaiz: NodoArchivo = {
      id: generarId(),
      nombre: 'Raiz',
      tipo: 'carpeta',
      correoCreador: 'sistema',
      fechaCreacion: new Date(),
      hijos: [],
    }
    setArbol(arbolRaiz)
    await guardarArbolEnFirebase(arbolRaiz)
    setCargandoArbol(false)
  }

  const guardarArbolEnFirebase = async (arbolAGuardar: NodoArchivo) => {
    if (!usuarioActual) return

    try {
      const refArbol = ref(database, `usuarios/${usuarioActual.id}/arbol`)
      await set(refArbol, arbolAGuardar)
    } catch (error) {
      console.error('Error al guardar el arbol:', error)
    }
  }

  const crearCarpeta = async (
    nombre: string,
    idPadre?: string
  ): Promise<ResultadoOperacion> => {
    if (!usuarioActual) {
      return {
        exito: false,
        mensaje: 'Debes estar autenticado para crear una carpeta',
      }
    }

    if (!arbol) {
      return { exito: false, mensaje: 'El arbol no esta inicializado' }
    }

    const nodoPadre = idPadre ? buscarNodoPorId(arbol, idPadre) : arbol

    if (!nodoPadre) {
      return { exito: false, mensaje: 'No se encontro la carpeta padre' }
    }

    if (nodoPadre.tipo === 'archivo') {
      return {
        exito: false,
        mensaje: 'No puedes crear carpetas dentro de un archivo',
      }
    }

    const nuevaCarpeta: NodoArchivo = {
      id: generarId(),
      nombre,
      tipo: 'carpeta',
      correoCreador: usuarioActual.correo,
      fechaCreacion: new Date(),
      hijos: [],
      idPadre,
    }

    nodoPadre.hijos.push(nuevaCarpeta)
    const arbolActualizado = { ...arbol }
    setArbol(arbolActualizado)
    await guardarArbolEnFirebase(arbolActualizado)

    return { exito: true, mensaje: 'Carpeta creada correctamente' }
  }

  const crearArchivo = async (
    nombre: string,
    idPadre?: string
  ): Promise<ResultadoOperacion> => {
    if (!usuarioActual) {
      return {
        exito: false,
        mensaje: 'Debes estar autenticado para crear un archivo',
      }
    }

    if (!arbol) {
      return { exito: false, mensaje: 'El arbol no esta inicializado' }
    }

    const nodoPadre = idPadre ? buscarNodoPorId(arbol, idPadre) : arbol

    if (!nodoPadre) {
      return { exito: false, mensaje: 'No se encontro la carpeta padre' }
    }

    if (nodoPadre.tipo === 'archivo') {
      return {
        exito: false,
        mensaje: 'No puedes crear archivos dentro de un archivo',
      }
    }

    const nuevoArchivo: NodoArchivo = {
      id: generarId(),
      nombre,
      tipo: 'archivo',
      correoCreador: usuarioActual.correo,
      fechaCreacion: new Date(),
      hijos: [],
      idPadre,
    }

    nodoPadre.hijos.push(nuevoArchivo)
    const arbolActualizado = { ...arbol }
    setArbol(arbolActualizado)
    await guardarArbolEnFirebase(arbolActualizado)

    return { exito: true, mensaje: 'Archivo creado correctamente' }
  }

  const eliminarNodo = async (id: string): Promise<ResultadoOperacion> => {
    if (!arbol) {
      return { exito: false, mensaje: 'El arbol no esta inicializado' }
    }

    const nodoAEliminar = buscarNodoPorId(arbol, id)
    if (!nodoAEliminar) {
      return { exito: false, mensaje: 'No se encontro el nodo a eliminar' }
    }

    const { exito } = eliminarNodoPorId(arbol, id)

    if (exito) {
      const arbolActualizado = { ...arbol }
      setArbol(arbolActualizado)
      await guardarArbolEnFirebase(arbolActualizado)
      return { exito: true, mensaje: 'Nodo eliminado correctamente' }
    }

    return {
      exito: false,
      mensaje: 'No se puede eliminar el nodo raiz',
    }
  }

  const obtenerNodoPorId = (id: string): NodoArchivo | null => {
    if (!arbol) return null
    return buscarNodoPorId(arbol, id)
  }

  return (
    <FileContext.Provider
      value={{
        arbol,
        crearCarpeta,
        crearArchivo,
        eliminarNodo,
        obtenerNodoPorId,
        cargandoArbol,
      }}
    >
      {children}
    </FileContext.Provider>
  )
}

export const useFiles = () => {
  const contexto = useContext(FileContext)
  if (!contexto) {
    throw new Error('useFiles tiene que estar dentro de FileProvider')
  }
  return contexto
}
