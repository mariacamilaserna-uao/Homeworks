import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Pila } from './pages/Pila'
import { ColaPage } from './pages/Cola'
import { PrivateRoute } from './components/PrivateRoute'
import { ErrorPage } from './pages/ErrorPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/pila"
          element={
            <PrivateRoute>
              <Pila />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/cola"
          element={
            <PrivateRoute>
              <ColaPage />
            </PrivateRoute>
          }
        />
        
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  )
}

export default App
