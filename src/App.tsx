import { useAuth } from './context/AuthContext'
import { AuthProvider } from './context/AuthContext'
import { FileProvider } from './context/FileContext'
import { Login } from './components/Login'
import { FileTree } from './components/FileTree'
import './App.css'

const AppContent = () => {
  const { estaAutenticado, cargando } = useAuth()

  if (cargando) {
    return <div className="app-loading">Cargando...</div>
  }

  return estaAutenticado ? <FileTree /> : <Login />
}

export const App = () => {
  return (
    <AuthProvider>
      <FileProvider>
        <AppContent />
      </FileProvider>
    </AuthProvider>
  )
}
