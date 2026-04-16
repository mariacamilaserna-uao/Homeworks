import { useState } from 'react'
import { useFiles } from '../context/FileContext'
import { useAuth } from '../context/AuthContext'
import { type NodoArchivo } from '../types'
import '../styles/FileTree.css'

interface NodoTreeProps {
  nodo: NodoArchivo
  nivel: number
  onDelete: (id: string) => void
  onAddFile: (idPadre: string) => void
  onAddFolder: (idPadre: string) => void
}

const NodoTree = ({
  nodo,
  nivel,
  onDelete,
  onAddFile,
  onAddFolder,
}: NodoTreeProps) => {
  const [expandido, setExpandido] = useState(true)

  const esArquivo = nodo.tipo === 'archivo'
  const tieneHijos = nodo.hijos.length > 0

  return (
    <div className="nodo" style={{ marginLeft: `${nivel * 20}px` }}>
      <div className="nodo-contenido">
        <div className="nodo-info">
          {tieneHijos && !esArquivo && (
            <button
              className="btn-expandir"
              onClick={() => setExpandido(!expandido)}
            >
              {expandido ? '▼' : '▶'}
            </button>
          )}
          {!tieneHijos && !esArquivo && (
            <span className="icono-vacio">•</span>
          )}
          <span className={`icono ${esArquivo ? 'archivo' : 'carpeta'}`}>
            {esArquivo ? '📄' : '📁'}
          </span>
          <span className="nombre">{nodo.nombre}</span>
          <span className="meta">({nodo.correoCreador})</span>
        </div>

        <div className="nodo-acciones">
          {!esArquivo && (
            <>
              <button
                className="btn-accion"
                onClick={() => onAddFolder(nodo.id)}
                title="Nueva carpeta"
              >
                +📁
              </button>
              <button
                className="btn-accion"
                onClick={() => onAddFile(nodo.id)}
                title="Nuevo archivo"
              >
                +📄
              </button>
            </>
          )}
          {nodo.nombre !== 'Raiz' && (
            <button
              className="btn-accion btn-delete"
              onClick={() => onDelete(nodo.id)}
              title="Eliminar"
            >
              🗑
            </button>
          )}
        </div>
      </div>

      {expandido && tieneHijos && (
        <div className="hijos">
          {nodo.hijos.map((hijo: NodoArchivo) => (
            <NodoTree
              key={hijo.id}
              nodo={hijo}
              nivel={nivel + 1}
              onDelete={onDelete}
              onAddFile={onAddFile}
              onAddFolder={onAddFolder}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export const FileTree = () => {
  const { arbol, crearCarpeta, crearArchivo, eliminarNodo, cargandoArbol } =
    useFiles()
  const { usuarioActual, logout } = useAuth()
  const [nuevoNombre, setNuevoNombre] = useState('')
  const [idPadreActual, setIdPadreActual] = useState<string | null>(null)
  const [tipoCreacion, setTipoCreacion] = useState<'carpeta' | 'archivo' | null>(
    null
  )
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleCrear = async () => {
    if (!nuevoNombre.trim()) {
      setMensaje('Escribe un nombre')
      return
    }

    setCargando(true)
    const idPadre = idPadreActual || arbol?.id

    try {
      let resultado
      if (tipoCreacion === 'carpeta') {
        resultado = await crearCarpeta(nuevoNombre, idPadre)
      } else {
        resultado = await crearArchivo(nuevoNombre, idPadre)
      }

      if (resultado.exito) {
        setMensaje(resultado.mensaje)
        setNuevoNombre('')
        setIdPadreActual(null)
        setTipoCreacion(null)
        setTimeout(() => setMensaje(''), 2000)
      } else {
        setMensaje(resultado.mensaje)
      }
    } catch (error) {
      setMensaje('Error al crear el elemento')
    } finally {
      setCargando(false)
    }
  }

  const handleDelete = async (id: string) => {
    setCargando(true)
    try {
      const resultado = await eliminarNodo(id)
      setMensaje(resultado.mensaje)
      setTimeout(() => setMensaje(''), 2000)
    } catch (error) {
      setMensaje('Error al eliminar el elemento')
    } finally {
      setCargando(false)
    }
  }

  const handleAddFile = (idPadre: string) => {
    setIdPadreActual(idPadre)
    setTipoCreacion('archivo')
  }

  const handleAddFolder = (idPadre: string) => {
    setIdPadreActual(idPadre)
    setTipoCreacion('carpeta')
  }

  if (cargandoArbol) {
    return (
      <div className="file-tree-container">
        <div className="cargando">Cargando tu arbol...</div>
      </div>
    )
  }

  return (
    <div className="file-tree-container">
      <div className="header">
        <div className="user-info">
          <span className="user-name">{usuarioActual?.nombre}</span>
          <span className="user-email">{usuarioActual?.correo}</span>
        </div>
        <button className="btn-logout" onClick={logout}>
          Salir
        </button>
      </div>

      {tipoCreacion && (
        <div className="crear-modal">
          <div className="modal-contenido">
            <h3>
              Crear nueva{' '}
              {tipoCreacion === 'carpeta' ? 'carpeta' : 'archivo'}
            </h3>
            <input
              type="text"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
              placeholder="Nombre..."
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !cargando) handleCrear()
              }}
              autoFocus
              disabled={cargando}
            />
            <div className="modal-botones">
              <button 
                className="btn-primary" 
                onClick={handleCrear}
                disabled={cargando}
              >
                {cargando ? 'Creando...' : 'Crear'}
              </button>
              <button
                className="btn-secondary"
                onClick={() => {
                  setTipoCreacion(null)
                  setIdPadreActual(null)
                  setNuevoNombre('')
                }}
                disabled={cargando}
              >
                Cancelar
              </button>
            </div>
            {mensaje && <p className={`mensaje`}>{mensaje}</p>}
          </div>
        </div>
      )}

      {!tipoCreacion && (
        <div className="acciones-raiz">
          <button
            className="btn-primary"
            onClick={() => handleAddFolder(arbol?.id || '')}
            disabled={cargando}
          >
            Nueva carpeta
          </button>
          <button
            className="btn-secondary"
            onClick={() => handleAddFile(arbol?.id || '')}
            disabled={cargando}
          >
            Nuevo archivo
          </button>
        </div>
      )}

      {arbol && (
        <div className="arbol">
          <NodoTree
            nodo={arbol}
            nivel={0}
            onDelete={handleDelete}
            onAddFile={handleAddFile}
            onAddFolder={handleAddFolder}
          />
        </div>
      )}

      {mensaje && !tipoCreacion && <p className="mensaje-global">{mensaje}</p>}
    </div>
  )
}
