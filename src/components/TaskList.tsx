import { useState } from 'react';
import type { Task } from '../contexts/TaskContext';
import { useTaskContext } from '../contexts/TaskContext';
import TaskForm from './TaskForm.tsx';
import '../styles/tasks.scss';

export default function TaskList() {
  const { tasks, updateTask, deleteTask, toggleTask, loading } = useTaskContext();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleEdit = (task: Task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleSaveEdit = async (id: string, completed: boolean) => {
    await updateTask(id, editTitle, editDescription, completed);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  if (loading) {
    return <div className="loading">Cargando tareas.....</div>;
  }

  return (
    <div className="tasks-container">
      <TaskForm />

      <div className="tasks-list">
        {tasks.length === 0 ? (
          <p className="no-tasks">No tienes tareas aun, creaa una tarea nueva</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              {editingId === task.id ? (
                <div className="task-edit">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Titulo de la tarea"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Descripcion"
                  />
                  <div className="edit-buttons">
                    <button onClick={() => handleSaveEdit(task.id, task.completed)} className="btn-save">
                      Guardar
                    </button>
                    <button onClick={handleCancel} className="btn-cancel">
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="task-content">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id, task.completed)}
                      className="task-checkbox"
                    />
                    <div className="task-text">
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                    </div>
                  </div>
                  <div className="task-buttons">
                    <button onClick={() => handleEdit(task)} className="btn-edit">
                      Editar
                    </button>
                    <button onClick={() => deleteTask(task.id)} className="btn-delete">
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
