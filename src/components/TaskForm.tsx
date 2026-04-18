import { useState } from 'react';
import { useTaskContext } from '../contexts/TaskContext';
import '../styles/tasks.scss';

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const { addTask, loading } = useTaskContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('El titulo es requerido');
      return;
    }

    try {
      await addTask(title, description);
      setTitle('');
      setDescription('');
      setError('');
    } catch {
      setError('Error al crear la tarea');
    }
  };

  return (
    <div className="task-form-container">
      <h2>Nueva tarea</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError('');
            }}
            placeholder="Que necesitas hacer?"
            className="task-input"
          />
        </div>

        <div className="form-group">
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setError('');
            }}
            placeholder="Describe tu tarea..."
            className="task-textarea"
          />
        </div>

        <button type="submit" disabled={loading} className="btn-add">
          {loading ? 'Agregando...' : 'Agregar tarea'}
        </button>
      </form>
    </div>
  );
}
