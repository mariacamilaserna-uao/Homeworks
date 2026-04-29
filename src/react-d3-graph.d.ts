declare module 'react-d3-graph' {
  import { ComponentType } from 'react'
  
  interface Node {
    id: string
    name?: string
    color?: string
    [key: string]: any
  }
  
  interface Link {
    source: string
    target: string
    [key: string]: any
  }
  
  interface GraphData {
    nodes: Node[]
    links: Link[]
  }
  
  interface GraphConfig {
    nodeColor?: string | ((node: Node) => string)
    nodeRelSize?: number
    linkColor?: string
    width?: number
    height?: number
    d3?: any
    [key: string]: any
  }
  
  interface GraphProps {
    id: string
    data: GraphData
    config: GraphConfig
  }
  
  export const Graph: ComponentType<GraphProps>
}