import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuthContext } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import './styles/index.scss';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuthContext();

  if (loading) {
    return <div className="loading-page">Cargando...</div>;
  }

  return currentUser ? children : <Navigate to="/login" />;
}

function TasksRoute() {
  const { currentUser } = useAuthContext();
  return (
    <TaskProvider currentUser={currentUser}>
      <Tasks />
    </TaskProvider>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <TasksRoute />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/tasks" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
