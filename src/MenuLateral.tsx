import { useState } from 'react'
import { NodoMenu } from './NArioMenu'
import './MenuLateral.css'

interface MenuLateralProps {
  raiz: NodoMenu | null
}

const MenuLateral = ({ raiz }: MenuLateralProps) => {
  const [expandidos, setExpandidos] = useState<Set<string>>(new Set())

  const toggleExpanded = (titulo: string) => {
    const nuevoExpandidos = new Set(expandidos)
    if (nuevoExpandidos.has(titulo)) {
      nuevoExpandidos.delete(titulo)
    } else {
      nuevoExpandidos.add(titulo)
    }
    setExpandidos(nuevoExpandidos)
  }

  const renderNodo = (nodo: NodoMenu, nivel: number = 0) => {
    const tieneHijos = nodo.hijos.length > 0
    const estaExpandido = expandidos.has(nodo.elemento.titulo)

    return (
      <div key={nodo.elemento.titulo} className="menu-item-container">
        <div
          className={`menu-item nivel-${nivel} ${tieneHijos ? 'tiene-hijos' : ''}`}
          style={{ paddingLeft: `${nivel * 20}px` }}
        >
          {tieneHijos && (
            <button
              className={`boton-expandir ${estaExpandido ? 'expandido' : ''}`}
              onClick={() => toggleExpanded(nodo.elemento.titulo)}
              aria-label={`Expandir ${nodo.elemento.titulo}`}
            >
              ▶
            </button>
          )}
          {!tieneHijos && <span className="espaciador"></span>}

          <a href={nodo.elemento.enlace} className="menu-link">
            {nodo.elemento.titulo}
          </a>
        </div>

        {tieneHijos && estaExpandido && (
          <div className="submenu-container">
            {nodo.hijos.map((hijo) => renderNodo(hijo, nivel + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <aside className="menu-lateral">
      <nav className="menu-nav">
        {raiz && renderNodo(raiz)}
      </nav>
    </aside>
  )
}

export default MenuLateral
