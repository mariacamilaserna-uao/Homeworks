import { useState } from 'react'
import { Graph } from 'react-d3-graph'
import './App.css'

interface Persona {
  id: string
  nombre: string
  edad: number
  ciudad: string
}

interface Ciudad {
  id: string
  nombre: string
}

const personas: Persona[] = [
  { id: 'p1', nombre: 'juan', edad: 25, ciudad: 'c1' },
  { id: 'p2', nombre: 'maria', edad: 30, ciudad: 'c1' },
  { id: 'p3', nombre: 'carlos', edad: 22, ciudad: 'c2' },
  { id: 'p4', nombre: 'ana', edad: 28, ciudad: 'c2' },
  { id: 'p5', nombre: 'luis', edad: 35, ciudad: 'c3' },
  { id: 'p6', nombre: 'sofia', edad: 24, ciudad: 'c3' },
]

const ciudades: Ciudad[] = [
  { id: 'c1', nombre: 'bogota' },
  { id: 'c2', nombre: 'medellin' },
  { id: 'c3', nombre: 'cali' },
]

const nodes = [
  ...personas.map(p => ({ id: p.id, name: `${p.nombre} (${p.edad})`, color: '#4a90d9' })),
  ...ciudades.map(c => ({ id: c.id, name: c.nombre, color: '#e74c3c' })),
]

const links = personas.map(p => ({ source: p.id, target: p.ciudad }))

const data = { nodes, links }

const myConfig = {
  nodeColor: (node: { color?: string }) => node.color || '#4a90d9',
  nodeRelSize: 6,
  linkColor: '#999',
  width: 500,
  height: 400,
  d3: { alpha: 0.3 },
}

function App() {
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState('c1')

  const personasEnCiudad = personas.filter(p => p.ciudad === ciudadSeleccionada)
  const ciudadActual = ciudades.find(c => c.id === ciudadSeleccionada)

  return (
    <div className="contenedor">
      <h1>red de amigos</h1>
      
      <div className="grafo">
        <Graph
          id="grafo-amigos"
          data={data}
          config={myConfig as any}
        />
      </div>

      <div className="filtro">
        <label>ver personas en: </label>
        <select 
          value={ciudadSeleccionada} 
          onChange={(e) => setCiudadSeleccionada(e.target.value)}
        >
          {ciudades.map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
      </div>

      <div className="lista">
        <h2>personas en {ciudadActual?.nombre}</h2>
        {personasEnCiudad.length === 0 ? (
          <p>no hay personas en esta ciudad</p>
        ) : (
          <ul>
            {personasEnCiudad.map(p => (
              <li key={p.id}>
                <span className="nombre">{p.nombre}</span>
                <span className="edad">{p.edad} años</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
