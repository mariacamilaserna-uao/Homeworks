import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import TaskList from '../components/TaskList';
import '../styles/tasks.scss';

export default function Tasks() {
  const { currentUser } = useAuthContext();
  const { logout, loading } = useFirebaseAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch {
      // Error manejado
    }
  };

  return (
    <div className="tasks-page">
      <header className="tasks-header">
        <h1>Mis tareas</h1>
        <div className="header-info">
          {currentUser && <span>Hola, {currentUser.displayName}</span>}
          <button onClick={handleLogout} disabled={loading} className="btn-logout">
            {loading ? 'Saliendo...' : 'Salir'}
          </button>
        </div>
      </header>

      <main className="tasks-main">
        <TaskList />
      </main>
    </div>
  );
}
